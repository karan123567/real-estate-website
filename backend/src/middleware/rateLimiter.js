import reteLimit, { rateLimit } from 'express-rate-limit';

// ============================================================
// CONFIGURATION
// ============================================================

// Rate limit store configuration
// In production, use Redis instead of memory store

const createStore = () => {
    // TODO: In production, replace with Redis:
  // import RedisStore from 'rate-limit-redis';
  // import { createClient } from 'redis';
  // 
  // const redisClient = createClient({ url: process.env.REDIS_URL });
  // return new RedisStore({ client: redisClient });
  
  // For now, use default memory store (resets on server restart)
  return undefined; // Uses default MemoryStore
};

// Skip rate limiting in development for localhost
const skipLocalhost = (req) => {
    if (process.env.NODE_ENV === 'development') {
        const ip = req.ip || req.connection.remoteAddress;
        return ip === '127.0.0.1' || ip === '::1' || ip === 'localhost';
    }
    return false;
};

// Custom handler for rate limit exceeded
const createLimitHandler = (message, retryAfterMinutes) => {
  return (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      message: message,
      retryAfter: retryAfterMinutes * 60,
      retryAfterMinutes: retryAfterMinutes,
      hint: `Please wait ${retryAfterMinutes} minutes before trying again`,
      timestamp: new Date().toISOString()
    });
  };
};

// ================================================================================
// GENERAL API LIMITER (Applied to all /api/* routes)
// ================================================================================

/**
 * General rate limiter for all API endpoints
 * Limit: 200 requests per 15 minutes per IP
 * Purpose: Prevent general API abuse
 */

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    error: 'Too many requests',
    message: 'You have exceeded the rate limit. Please try again later.',
    limit: 200,
    window: '15 minutes'
  },

  standardHeaders: true,
  legacyHeaders: false,

  skip: skipLocalhost,
  store: createStore(),
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },

  handler: createLimitHandler(
    'Too many API requests from this IP , please try again after 15 minutes',
    15
  )
});


// ===============================================================================
// CONTACT FORM LIMITER (Very Strict - Prevents Spam)
// ===============================================================================

/**
 * Strict rate limiter for contact/inquiry forms
 * Limit: 5 submissions per hour per IP
 * Purpose: Prevents spam and abuse of contact forms
 */

export const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 5,
  message: {
    error: 'Too many inquiries',
    message: 'You have submitted too many inquiries. Please try again after 1 hour.',
    limit: 5,
    window: '1 hour'
  },

  standardHeaders: true,
  legacyHeaders: false,
  skip: skipLocalhost,
  store: createStore(),

  keyGenerator: (req) => {
    const ip = req.ip;
    const email = req.body.email || '';
    return `contact:${ip}:$(email)`;
  },

  handler: createLimitHandler(
    'You have submitted too many inquiries. Our team will respond to you previous message soon. Please wait 1 hour before submitting again.',
    60
  )
});


// ========================================================================================
// LOGIN LIMITER (Strict - Prevents Force Attacks)
// ========================================================================================

/**
 * Strict rate limiter for login attempts
 * Limit: 5 failed login attempts per 15 minutes
 * Purpose: Prevents brute-force password attacks
 */

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many login attempts',
    message: 'Account temporarily locked due to multiple failed login attempts. Please try again after 15 minutes.',
    limit: 5,
    window: '15 minutes',
    security: 'If you forgot your password, use the password reset feature.'
  },

  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipLocalhost,
  store: createStore(),

  keyGenerator: (req) => {
    const ip = req.ip;
    const email = req.body?.email || 'unknown';
    return `login:$(ip):${email}`;
  },

  handler: createLimitHandler(
    'Too many failed login attempts. Account temporarily locked for security. Please try again in 15 minutes.',
    15
  ),
  skip: (req) => {
    if (skipLocalhost(req)) return true;

    const whitelistedIPs = process.env.WHITE_IPS?.split(',') || [];
    if (whitelistedIPs.includes(req.ip)) return true;
    return false;
  }
});



// ===========================================================================
// IMAGE UPLOAD LIMITER (Prevents Storage Abuse)
// ===========================================================================

/**
 * Rate limiter for file/image uploads
 * Limit: 50 uploads per hour per IP
 * Purpose: Prevent storage abuse and excessive bandwidth use
 */

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: {
    error: 'Upload limit reached',
    message: 'Too many file uploads. Plesse try again later.',
    limit: 50,
    window: '1 hour'
  },

  standardHeaders: true,
  legacyHeaders:false,
  skip: skipLocalhost,
  store: createStore(),

  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },

  handler: createLimitHandler(
    'You have reached the maximum number of uplads for this hour. Please wait before uploading more files.',
    60
  )
});

// =============================================================================================
// ADVANCED: DYNAMIC RATE LIMITER (Based on User Role)
// =============================================================================================

/**
 * Create a rate limiter with different limits for different user roles
 * Usage: dynamicLimiter({admin: 1000, user: 100, guest: 50})
 */

export const dynamicLimiter = (limits = {}) => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req) => {
      const role = req.user?.role || 'guest';
      return limits[role] || limits.guest || 50;
    },

    keyGenerator: (req) => {
      return req.user?.id || req.ip;
    },

    standardHeaders: true,
    legacyHeaders: false,
    skip: skipLocalhost,
    store:createStore()
  });
};


//====================================================================================
// PASSWORD RESET LIMITER (Prevent email spam)
// ===================================================================================

/**
 * Rate limiter for password reset requests
 * limit: 3 requests per hour per IP
 * Puspose: Prevet email spam via password reset
 */

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    error: 'Too many password reset requests',
    message: 'You have requested too many password resets. Please check you email or wait 1 hour.',
    limit: 3,
    window: '1 hour'
  },

  standardHeaders: true,
  legacyHeaders: false,
  skip: skipLocalhost,
  store: createStore(),

  keyGenerator: (req) => {
    const ip = req.ip;
    const email = req.body?.email || '';
    return `reset:${ip}:${email}`;
  },

  handler: createLimitHandler(
    'Too many password reset requests. Please check your email inbox and spam folder. Wait 1 hour before requesting again.',
    60
  )
});


// =================================================================================
// SEARCH LIMITER (Prevent Search Abuse)
// =================================================================================

/**
 * Rate limiter for search endpoints 
 * limit: 60 searches per minute (1 per second)
 * Purpose: Prevent search API abuse and expensive database queries
 */

export const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    error: 'Too many search requests',
    message: 'You are searching too quickly. Please slow down.',
    limit: 60,
    window: '1 minuts'
  },

  standardHeaders: true,
  legacyHeaders: false,
  skip: skipLocalhost,
  store: createStore()
});



// ====================================================================================
// HELPER: CREATE CUSTOM LIMITER
// ====================================================================================

/**
 * Factory function to create custom rate limiters
 * 
 * @param {Object} options
 * @param {number} options.windowMinuts
 * @param {number} options.maxRequests
 * @param {string} options.message
 * @param {string} options.keyPrefix
 */

export const createCustomLimiter = ({
  windowMinuts = 15,
  maxRequests = 100,
  message = 'too many requests',
  keyPrefix = 'custom'
}) => {
  return rateLimit({
    windowMs: windowMinuts * 60 * 1000,
    max: maxRequests,
    message: {
      error: 'Rate limit exceeded',
      message: message,
      limit: maxRequests,
      window: `${windowMinuts} minutes`
    },

    standardHeaders: true,
    legacyHeaders: false,
    skip: skipLocalhost,
    store: createStore(),

    keyGenerator: (req) => {
      const identifier = req.user?.id || req.ip;
      return `${keyPrefix}:${identifier}`;
    },

    handler: createLimitHandler(message, windowMinuts)
  });
};


// ===================================================================================
// EXPORTS
// ===================================================================================


export default {
  apiLimiter,
  contactFormLimiter,
  loginLimiter,
  uploadLimiter,
  dynamicLimiter,
  passwordResetLimiter,
  searchLimiter,
  createCustomLimiter
};