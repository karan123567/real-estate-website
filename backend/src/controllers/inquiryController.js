import { query } from '../models/db.js';
import { sendInquiryEmails } from '../utils/emailService.js';

// ============================================================
// POST /api/inquiries - Submit contact form / inquiry
// Public endpoint (no authentication required)
// Rate limited to 5 submissions per hour per IP
// ============================================================
const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    // Get IP address for logging
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || 'unknown';

    // Validate required fields (Zod validation already done in middleware)
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Name, email, and message are required'
      });
    }

    // Get property info if propertyId provided
    let propertyInfo = null;
    if (propertyId) {
      const propResult = await query(
        'SELECT id, title, city, price, property_type FROM properties WHERE id = $1',
        [propertyId]
      );
      
      if (propResult.rows.length > 0) {
        propertyInfo = propResult.rows[0];
      }
    }

    // Save inquiry to database
    const { rows } = await query(
      `INSERT INTO inquiries (
        property_id, 
        name, 
        email, 
        phone, 
        message, 
        status,
        inquiry_type
      )
      VALUES ($1, $2, $3, $4, $5, 'new', $6)
      RETURNING *`,
      [
        propertyId || null, 
        name.trim(), 
        email.toLowerCase().trim(), 
        phone?.trim() || null, 
        message.trim(),
        propertyId ? 'info' : 'general'
      ]
    );

    const inquiry = rows[0];

    console.log(`📧 New inquiry from ${email} (IP: ${ipAddress})`);

    // Prepare email data
    const emailData = {
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
      propertyTitle: propertyInfo?.title || null,
      propertyCity: propertyInfo?.city || null,
      propertyPrice: propertyInfo?.price || null,
      propertyId: propertyInfo?.id || null,
      createdAt: inquiry.created_at
    };

    // Send emails asynchronously (don't make user wait)
    // Email failures won't prevent inquiry from being saved
    sendInquiryEmails(emailData)
      .then(() => console.log(`✅ Emails sent for inquiry ${inquiry.id}`))
      .catch(err => console.error(`❌ Email failed for inquiry ${inquiry.id}:`, err.message));

    // Return success response immediately
    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will contact you within 24 hours.',
      inquiry: {
        id: inquiry.id,
        status: inquiry.status,
        createdAt: inquiry.created_at
      }
    });

  } catch (error) {
    console.error('submitInquiry error:', error);
    
    // Don't expose internal errors to client
    if (error.code === '23503') {
      // Foreign key violation (invalid propertyId)
      return res.status(400).json({
        error: 'Invalid property',
        message: 'The specified property does not exist'
      });
    }

    next(error);
  }
};



const getAllInquiries = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const offset = (page - 1) * limit;
    const status = req.query.status || null;

    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (status) {
      conditions.push(`i.status = $${paramIndex++}`);
      params.push(status);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const [countResult, dataResult] = await Promise.all([
      query(`SELECT COUNT(*) as count FROM inquiries i ${whereClause}`, params),
      query(`
        SELECT i.*, p.title as property_title, p.city as property_city
        FROM inquiries i
        LEFT JOIN properties p ON i.property_id = p.id
        ${whereClause}
        ORDER BY i.created_at DESC
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `, [...params, limit, offset])
    ]);

    const total = parseInt(countResult.rows[0].count) || 0;

    res.json({
      success: true,
      inquiries: dataResult.rows || [],
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalInquiries: total,
        perPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1
      }
    });

  } catch (error) {
    console.error('getAllInquiries error:', error);
    next(error);
  }
};






// ============================================================
// GET /api/inquiries/:id - Get single inquiry by ID (Admin only)
// This would be added to admin routes if needed
// ============================================================
const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await query(
      `SELECT 
        i.*,
        p.title as property_title,
        p.city as property_city,
        p.price as property_price,
        p.property_type
      FROM inquiries i
      LEFT JOIN properties p ON i.property_id = p.id
      WHERE i.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      inquiry: rows[0]
    });

  } catch (error) {
    console.error('getInquiryById error:', error);
    next(error);
  }
};


// ============================================================
// DELETE /api/inquiries/:id - Delete inquiry (Admin only)
// ============================================================
const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await query(
      'DELETE FROM inquiries WHERE id = $1 RETURNING id, name',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Inquiry not found'
      });
    }

    console.log(`🗑️ Inquiry deleted: ${rows[0].id} from ${rows[0].name}`);

    res.json({
      success: true,
      message: 'Inquiry deleted successfully',
      deletedId: rows[0].id
    });

  } catch (error) {
    console.error('deleteInquiry error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/inquiries/stats - Get inquiry statistics (Admin only)
// ============================================================
const getInquiryStats = async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));

    const [statusResult, propertyResult, dailyResult] = await Promise.all([
      // Count by status
      query(`
        SELECT 
          status,
          COUNT(*) as count
        FROM inquiries
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY status
      `),

      // Top properties by inquiries
      query(`
        SELECT 
          p.id,
          p.title,
          p.city,
          COUNT(i.id) as inquiry_count
        FROM properties p
        LEFT JOIN inquiries i ON p.id = i.property_id
          AND i.created_at > NOW() - INTERVAL '${days} days'
        WHERE i.id IS NOT NULL
        GROUP BY p.id, p.title, p.city
        ORDER BY inquiry_count DESC
        LIMIT 10
      `),

      // Inquiries per day
      query(`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM inquiries
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `)
    ]);

    res.json({
      success: true,
      period: `${days} days`,
      byStatus: statusResult.rows,
      topProperties: propertyResult.rows,
      daily: dailyResult.rows
    });

  } catch (error) {
    console.error('getInquiryStats error:', error);
    next(error);
  }
};

export {
  submitInquiry,
  getInquiryById,
  deleteInquiry,
  getInquiryStats,
  getAllInquiries
};
export default {
  submitInquiry,
  getInquiryById,
  deleteInquiry,
  getInquiryStats,
  getAllInquiries
};