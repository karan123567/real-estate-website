import { query } from '../models/db.js';

// ============================================================
// POST /api/analytics/session/start
// Initialize visitor session tracking
// ============================================================
const startSession = async (req, res, next) => {
  try {
    const {
      sessionId, 
      referrer, 
      utmSource, 
      utmMedium, 
      utmCampaign,
      deviceType, 
      browser, 
      os, 
      screenWidth, 
      screenHeight,
      language
    } = req.body;

    // Get IP and user agent from request
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || 'unknown';
    const userAgent = req.headers['user-agent'] || '';

    // Check if session already exists (returning visitor)
    const existingSession = await query(
      'SELECT session_id FROM visitor_sessions WHERE session_id = $1',
      [sessionId]
    );

    if (existingSession.rows.length > 0) {
      // Update last activity for existing session
      await query(
        'UPDATE visitor_sessions SET last_activity = NOW() WHERE session_id = $1',
        [sessionId]
      );
      
      return res.json({ success: true, returning: true });
    }

    // Create new session
    await query(
      `INSERT INTO visitor_sessions (
        session_id, 
        ip_address, 
        user_agent, 
        device_type, 
        browser, 
        os,
        screen_width, 
        screen_height, 
        referrer_url,
        utm_source, 
        utm_medium, 
        utm_campaign,
        first_visit, 
        last_activity
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())`,
      [
        sessionId,
        ipAddress,
        userAgent,
        deviceType,
        browser,
        os,
        screenWidth,
        screenHeight,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign
      ]
    );

    res.json({ success: true, returning: false });

  } catch (error) {
    // Don't fail the request if analytics fails
    console.error('startSession error:', error);
    res.json({ success: false, error: 'Analytics tracking failed' });
  }
};


// ============================================================
// POST /api/analytics/session/end
// Update session with total time and pages viewed
// ============================================================
const endSession = async (req, res, next) => {
  try {
    const { sessionId, totalPages, totalTimeSeconds } = req.body;

    if (!sessionId) {
      return res.status(400).json({ 
        error: 'sessionId required' 
      });
    }

    await query(
      `UPDATE visitor_sessions 
       SET 
         last_activity = NOW(),
         total_pages_viewed = COALESCE($2, total_pages_viewed),
         total_time_seconds = COALESCE($3, total_time_seconds)
       WHERE session_id = $1`,
      [sessionId, totalPages, totalTimeSeconds]
    );

    res.json({ success: true });

  } catch (error) {
    console.error('endSession error:', error);
    res.json({ success: false });
  }
};


// ============================================================
// POST /api/analytics/track
// Track various user events (property views, searches, etc.)
// ============================================================
const trackEvent = async (req, res, next) => {
  try {
    const { 
      sessionId, 
      eventType, 
      propertyId, 
      pageUrl, 
      metadata 
    } = req.body;

    if (!sessionId || !eventType) {
      return res.status(400).json({ 
        error: 'sessionId and eventType required' 
      });
    }

    // Track property views specifically
    if (eventType === 'property_view' && propertyId) {
      await query(
        `INSERT INTO property_views (
          session_id, 
          property_id, 
          viewed_at, 
          time_spent,
          gallery_viewed,
          map_viewed,
          calculator_used
        )
        VALUES ($1, $2, NOW(), $3, $4, $5, $6)`,
        [
          sessionId,
          propertyId,
          metadata?.timeSpent || 0,
          metadata?.galleryViewed || false,
          metadata?.mapViewed || false,
          metadata?.calculatorUsed || false
        ]
      );
    }

    // Track searches
    if (eventType === 'search' && metadata?.query) {
      await query(
        `INSERT INTO search_logs (
          session_id, 
          search_query, 
          filters, 
          results_count, 
          searched_at
        )
        VALUES ($1, $2, $3, $4, NOW())`,
        [
          sessionId,
          metadata.query,
          JSON.stringify(metadata.filters || {}),
          metadata.resultsCount || 0
        ]
      );
    }

    // Track all events in generic events table
    await query(
      `INSERT INTO user_events (
        session_id, 
        event_type, 
        page_url, 
        metadata, 
        created_at
      )
      VALUES ($1, $2, $3, $4, NOW())`,
      [
        sessionId,
        eventType,
        pageUrl || null,
        JSON.stringify(metadata || {})
      ]
    );

    res.json({ success: true });

  } catch (error) {
    // Don't fail if analytics fails
    console.error('trackEvent error:', error);
    res.json({ success: false });
  }
};


// ============================================================
// GET /api/analytics/overview (Admin only)
// Get overview analytics for dashboard
// ============================================================
const getOverview = async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));

    const [visitorsResult, inquiriesResult, topPropertiesResult, searchesResult] = await Promise.all([
      // Visitor stats
      query(`
        SELECT 
          COUNT(DISTINCT session_id) as total_visitors,
          COUNT(DISTINCT CASE WHEN is_returning = true THEN session_id END) as returning_visitors,
          AVG(total_pages_viewed) as avg_pages_per_session,
          AVG(total_time_seconds) as avg_time_per_session
        FROM visitor_sessions
        WHERE first_visit > NOW() - INTERVAL '${days} days'
      `),

      // Inquiry stats
      query(`
        SELECT 
          COUNT(*) as total_inquiries,
          COUNT(DISTINCT session_id) as sessions_with_inquiry
        FROM inquiries
        WHERE created_at > NOW() - INTERVAL '${days} days'
      `),

      // Top properties by views
      query(`
        SELECT 
          p.id, 
          p.title, 
          p.city, 
          p.price,
          COUNT(pv.id) as view_count,
          COUNT(DISTINCT pv.session_id) as unique_visitors,
          AVG(pv.time_spent) as avg_time_spent
        FROM properties p
        LEFT JOIN property_views pv ON p.id = pv.property_id
          AND pv.viewed_at > NOW() - INTERVAL '${days} days'
        WHERE pv.id IS NOT NULL
        GROUP BY p.id, p.title, p.city, p.price
        ORDER BY view_count DESC
        LIMIT 10
      `),

      // Top searches
      query(`
        SELECT 
          search_query,
          COUNT(*) as search_count,
          AVG(results_count)::int as avg_results
        FROM search_logs
        WHERE searched_at > NOW() - INTERVAL '${days} days'
          AND search_query IS NOT NULL
          AND search_query != ''
        GROUP BY search_query
        ORDER BY search_count DESC
        LIMIT 10
      `)
    ]);

    // Calculate conversion rate
    const totalVisitors = parseInt(visitorsResult.rows[0]?.total_visitors) || 0;
    const totalInquiries = parseInt(inquiriesResult.rows[0]?.total_inquiries) || 0;
    const conversionRate = totalVisitors > 0 
      ? ((totalInquiries / totalVisitors) * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      period: `${days} days`,
      visitors: {
        total: totalVisitors,
        returning: parseInt(visitorsResult.rows[0]?.returning_visitors) || 0,
        avgPagesPerSession: parseFloat(visitorsResult.rows[0]?.avg_pages_per_session || 0).toFixed(1),
        avgTimePerSession: Math.round(visitorsResult.rows[0]?.avg_time_per_session || 0)
      },
      inquiries: {
        total: totalInquiries,
        sessionsWithInquiry: parseInt(inquiriesResult.rows[0]?.sessions_with_inquiry) || 0
      },
      conversion: {
        rate: parseFloat(conversionRate),
        visitors: totalVisitors,
        inquiries: totalInquiries
      },
      topProperties: topPropertiesResult.rows || [],
      topSearches: searchesResult.rows || []
    });

  } catch (error) {
    console.error('getOverview error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/analytics/visitors (Admin only)
// Get visitor data over time
// ============================================================
const getVisitors = async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));

    const { rows } = await query(`
      SELECT 
        DATE(first_visit) as date,
        COUNT(DISTINCT session_id) as total_visitors,
        COUNT(DISTINCT CASE WHEN is_returning THEN session_id END) as returning_visitors,
        COUNT(DISTINCT CASE WHEN NOT is_returning THEN session_id END) as new_visitors
      FROM visitor_sessions
      WHERE first_visit > NOW() - INTERVAL '${days} days'
      GROUP BY DATE(first_visit)
      ORDER BY date ASC
    `);

    res.json({
      success: true,
      period: `${days} days`,
      data: rows || []
    });

  } catch (error) {
    console.error('getVisitors error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/analytics/properties/:id (Admin only)
// Get analytics for specific property
// ============================================================
const getPropertyAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));

    const [viewsResult, dailyViewsResult, inquiriesResult, engagementResult] = await Promise.all([
      // Total views and unique visitors
      query(`
        SELECT 
          COUNT(*) as total_views,
          COUNT(DISTINCT session_id) as unique_visitors,
          AVG(time_spent) as avg_time_spent
        FROM property_views
        WHERE property_id = $1
          AND viewed_at > NOW() - INTERVAL '${days} days'
      `, [id]),

      // Views over time
      query(`
        SELECT 
          DATE(viewed_at) as date,
          COUNT(*) as views,
          COUNT(DISTINCT session_id) as unique_visitors
        FROM property_views
        WHERE property_id = $1
          AND viewed_at > NOW() - INTERVAL '${days} days'
        GROUP BY DATE(viewed_at)
        ORDER BY date ASC
      `, [id]),

      // Inquiries for this property
      query(`
        SELECT COUNT(*) as inquiry_count
        FROM inquiries
        WHERE property_id = $1
          AND created_at > NOW() - INTERVAL '${days} days'
      `, [id]),

      // Engagement metrics
      query(`
        SELECT 
          COUNT(CASE WHEN gallery_viewed THEN 1 END) as gallery_views,
          COUNT(CASE WHEN map_viewed THEN 1 END) as map_views,
          COUNT(CASE WHEN calculator_used THEN 1 END) as calculator_uses
        FROM property_views
        WHERE property_id = $1
          AND viewed_at > NOW() - INTERVAL '${days} days'
      `, [id])
    ]);

    const totalViews = parseInt(viewsResult.rows[0]?.total_views) || 0;
    const uniqueVisitors = parseInt(viewsResult.rows[0]?.unique_visitors) || 0;
    const inquiryCount = parseInt(inquiriesResult.rows[0]?.inquiry_count) || 0;
    const conversionRate = uniqueVisitors > 0
      ? ((inquiryCount / uniqueVisitors) * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      propertyId: id,
      period: `${days} days`,
      overview: {
        totalViews,
        uniqueVisitors,
        avgTimeSpent: Math.round(viewsResult.rows[0]?.avg_time_spent || 0),
        inquiries: inquiryCount,
        conversionRate: parseFloat(conversionRate)
      },
      engagement: {
        galleryViews: parseInt(engagementResult.rows[0]?.gallery_views) || 0,
        mapViews: parseInt(engagementResult.rows[0]?.map_views) || 0,
        calculatorUses: parseInt(engagementResult.rows[0]?.calculator_uses) || 0
      },
      viewsOverTime: dailyViewsResult.rows || []
    });

  } catch (error) {
    console.error('getPropertyAnalytics error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/analytics/traffic-sources (Admin only)
// Analyze traffic sources (referrers, UTM campaigns)
// ============================================================
const getTrafficSources = async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));

    const [referrersResult, utmSourcesResult, devicesResult] = await Promise.all([
      // Top referrers
      query(`
        SELECT 
          CASE 
            WHEN referrer_url IS NULL OR referrer_url = '' THEN 'Direct'
            WHEN referrer_url LIKE '%google%' THEN 'Google'
            WHEN referrer_url LIKE '%facebook%' THEN 'Facebook'
            WHEN referrer_url LIKE '%twitter%' OR referrer_url LIKE '%t.co%' THEN 'Twitter'
            ELSE referrer_url
          END as source,
          COUNT(DISTINCT session_id) as visitors
        FROM visitor_sessions
        WHERE first_visit > NOW() - INTERVAL '${days} days'
        GROUP BY source
        ORDER BY visitors DESC
        LIMIT 10
      `),

      // UTM campaigns
      query(`
        SELECT 
          utm_source,
          utm_medium,
          utm_campaign,
          COUNT(DISTINCT session_id) as visitors
        FROM visitor_sessions
        WHERE first_visit > NOW() - INTERVAL '${days} days'
          AND utm_source IS NOT NULL
        GROUP BY utm_source, utm_medium, utm_campaign
        ORDER BY visitors DESC
        LIMIT 10
      `),

      // Device breakdown
      query(`
        SELECT 
          device_type,
          COUNT(DISTINCT session_id) as visitors,
          AVG(total_time_seconds) as avg_time
        FROM visitor_sessions
        WHERE first_visit > NOW() - INTERVAL '${days} days'
          AND device_type IS NOT NULL
        GROUP BY device_type
        ORDER BY visitors DESC
      `)
    ]);

    res.json({
      success: true,
      period: `${days} days`,
      referrers: referrersResult.rows || [],
      utmCampaigns: utmSourcesResult.rows || [],
      devices: devicesResult.rows || []
    });

  } catch (error) {
    console.error('getTrafficSources error:', error);
    next(error);
  }
};

export {
  startSession,
  endSession,
  trackEvent,
  getOverview,
  getVisitors,
  getPropertyAnalytics,
  getTrafficSources
};

export default {
  startSession,
  endSession,
  trackEvent,
  getOverview,
  getVisitors,
  getPropertyAnalytics,
  getTrafficSources
};
