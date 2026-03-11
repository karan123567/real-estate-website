import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../models/db.js';

const SALT_ROUNDS = 12;

// ============================================================
// POST /api/admin/login - Admin login
// Returns: Admin info (NO TOKEN in response!)
// Sets: httpOnly cookie with JWT
// ============================================================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find admin by email
    const { rows } = await query(
      'SELECT * FROM admins WHERE email = $1 AND status = $2',
      [email.toLowerCase().trim(), 'active']
    );

    const admin = rows[0];

    // 2. Check admin exists (use same error message for security)
    if (!admin) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // 3. Verify password
    const isValidPassword = await compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        name: admin.name,
        role: 'admin'  // ← CRITICAL: Role in payload
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // 5. Update last login timestamp
    await query(
      'UPDATE admins SET last_login = NOW() WHERE id = $1',
      [admin.id]
    );

    // 6. ✅ SET SECURE httpOnly COOKIE (NOT in response body!)
    res.cookie('auth_token', token, {
      httpOnly: true,                                    // ← JavaScript CANNOT read!
      secure: process.env.NODE_ENV === 'production',    // ← HTTPS only in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // ← Cross-domain if production
      domain: process.env.COOKIE_DOMAIN || undefined,   // ← e.g., '.yourdomain.com'
      maxAge: 24 * 60 * 60 * 1000,                      // ← 24 hours
      path: '/',
    });

    console.log(`✅ Admin login successful: ${admin.email}`);

    // 7. Return admin info (NO TOKEN!)
    res.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        lastLogin: admin.last_login
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};


// ============================================================
// POST /api/admin/logout - Admin logout
// Clears the httpOnly cookie
// ============================================================
const logout = async (req, res) => {
  // Clear the auth cookie
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: '/',
  });

  console.log(`✅ Admin logout: ${req.user?.email || 'unknown'}`);

  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
};


// ============================================================
// GET /api/admin/me - Get current admin info
// ============================================================
const getMe = async (req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT id, email, name, last_login, created_at 
       FROM admins 
       WHERE id = $1 AND status = 'active'`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        error: 'Admin not found or inactive' 
      });
    }

    res.json({ 
      success: true,
      admin: rows[0] 
    });

  } catch (error) {
    console.error('getMe error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/admin/dashboard - Dashboard stats
// ============================================================
const getDashboard = async (req, res, next) => {
  try {
    // Run all queries in parallel for speed
    const [
      propertiesResult,
      inquiriesResult,
      visitorsResult,
      recentInquiriesResult
    ] = await Promise.all([
      query(`
        SELECT 
          COUNT(*) FILTER (WHERE status = 'available') as available,
          COUNT(*) FILTER (WHERE featured = true) as featured,
          COUNT(*) as total
        FROM properties
      `),
      query(`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE status = 'new') as new_count,
          COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as monthly
        FROM inquiries
      `),
      query(`
        SELECT 
          COUNT(DISTINCT session_id) as total,
          COUNT(DISTINCT CASE WHEN is_returning = true THEN session_id END) as returning
        FROM visitor_sessions
        WHERE first_visit > NOW() - INTERVAL '30 days'
      `),
      query(`
        SELECT 
          i.id,
          i.name,
          i.email,
          i.status,
          i.created_at,
          p.title as property_title,
          p.id as property_id
        FROM inquiries i
        LEFT JOIN properties p ON i.property_id = p.id
        ORDER BY i.created_at DESC
        LIMIT 10
      `)
    ]);

    res.json({
      success: true,
      stats: {
        properties: {
          total: parseInt(propertiesResult.rows[0].total) || 0,
          available: parseInt(propertiesResult.rows[0].available) || 0,
          featured: parseInt(propertiesResult.rows[0].featured) || 0
        },
        inquiries: {
          total: parseInt(inquiriesResult.rows[0].total) || 0,
          new: parseInt(inquiriesResult.rows[0].new_count) || 0,
          monthly: parseInt(inquiriesResult.rows[0].monthly) || 0
        },
        visitors: {
          monthly: parseInt(visitorsResult.rows[0].total) || 0,
          returning: parseInt(visitorsResult.rows[0].returning) || 0
        }
      },
      recentInquiries: recentInquiriesResult.rows || []
    });

  } catch (error) {
    console.error('getDashboard error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/admin/inquiries - List all inquiries with pagination
// ============================================================
const getInquiries = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const offset = (page - 1) * limit;
    
    // Build WHERE clause for filters
    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (req.query.status && ['new', 'contacted', 'scheduled', 'closed'].includes(req.query.status)) {
      conditions.push(`i.status = $${paramIndex}`);
      params.push(req.query.status);
      paramIndex++;
    }

    if (req.query.propertyId) {
      conditions.push(`i.property_id = $${paramIndex}`);
      params.push(req.query.propertyId);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM inquiries i ${whereClause}`;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].count) || 0;

    // Get inquiries
    const dataQuery = `
      SELECT 
        i.*,
        p.title as property_title,
        p.city as property_city,
        p.price as property_price
      FROM inquiries i
      LEFT JOIN properties p ON i.property_id = p.id
      ${whereClause}
      ORDER BY i.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const dataResult = await query(dataQuery, [...params, limit, offset]);

    res.json({
      success: true,
      inquiries: dataResult.rows || [],
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total: total,
        perPage: limit
      }
    });

  } catch (error) {
    console.error('getInquiries error:', error);
    next(error);
  }
};


// ============================================================
// PUT /api/admin/inquiries/:id/status - Update inquiry status
// ============================================================
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'scheduled', 'closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status',
        validStatuses 
      });
    }

    const { rows } = await query(
      `UPDATE inquiries 
       SET 
         status = $1, 
         responded_at = CASE 
           WHEN $1 != 'new' AND responded_at IS NULL 
           THEN NOW() 
           ELSE responded_at 
         END
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        error: 'Inquiry not found' 
      });
    }

    console.log(`✅ Inquiry ${id} status updated to: ${status}`);

    res.json({ 
      success: true,
      inquiry: rows[0] 
    });

  } catch (error) {
    console.error('updateInquiryStatus error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/admin/analytics - Analytics overview
// ============================================================
const getAnalytics = async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));

    const [visitorsResult, topPropertiesResult, searchesResult, conversionResult] = await Promise.all([
      // Visitors over time
      query(`
        SELECT 
          DATE(first_visit) as date,
          COUNT(DISTINCT session_id) as visitors,
          COUNT(DISTINCT CASE WHEN is_returning = true THEN session_id END) as returning_visitors
        FROM visitor_sessions
        WHERE first_visit > NOW() - INTERVAL '${days} days'
        GROUP BY DATE(first_visit)
        ORDER BY date ASC
      `),
      
      // Top viewed properties
      query(`
        SELECT 
          p.id, 
          p.title, 
          p.city, 
          p.price,
          COUNT(pv.id) as view_count,
          COUNT(DISTINCT pv.session_id) as unique_visitors
        FROM properties p
        LEFT JOIN property_views pv ON p.id = pv.property_id
          AND pv.viewed_at > NOW() - INTERVAL '${days} days'
        GROUP BY p.id, p.title, p.city, p.price
        HAVING COUNT(pv.id) > 0
        ORDER BY view_count DESC
        LIMIT 10
      `),
      
      // Top search queries
      query(`
        SELECT 
          search_query, 
          COUNT(*) as count,
          AVG(results_count) as avg_results
        FROM search_logs
        WHERE searched_at > NOW() - INTERVAL '${days} days'
          AND search_query IS NOT NULL
          AND search_query != ''
        GROUP BY search_query
        ORDER BY count DESC
        LIMIT 10
      `),

      // Conversion rate
      query(`
        SELECT 
          COUNT(DISTINCT vs.session_id) as total_visitors,
          COUNT(DISTINCT i.id) as total_inquiries,
          ROUND(
            (COUNT(DISTINCT i.id)::numeric / NULLIF(COUNT(DISTINCT vs.session_id), 0)) * 100, 
            2
          ) as conversion_rate
        FROM visitor_sessions vs
        LEFT JOIN inquiries i ON DATE(i.created_at) = DATE(vs.first_visit)
        WHERE vs.first_visit > NOW() - INTERVAL '${days} days'
      `)
    ]);

    res.json({
      success: true,
      period: `${days} days`,
      visitorsOverTime: visitorsResult.rows || [],
      topProperties: topPropertiesResult.rows || [],
      topSearches: searchesResult.rows || [],
      conversion: conversionResult.rows[0] || {
        total_visitors: 0,
        total_inquiries: 0,
        conversion_rate: 0
      }
    });

  } catch (error) {
    console.error('getAnalytics error:', error);
    next(error);
  }
};


// ============================================================
// EXPORTS
// ============================================================
export { 
  login, 
  logout, 
  getMe, 
  getDashboard, 
  getInquiries, 
  updateInquiryStatus, 
  getAnalytics 
};
export default { 
  login, 
  logout, 
  getMe, 
  getDashboard, 
  getInquiries, 
  updateInquiryStatus, 
  getAnalytics 
};