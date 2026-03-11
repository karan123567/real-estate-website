import jwt from 'jsonwebtoken';

// ============================================================
// Middleware: Authenticate Admin
// Reads JWT from httpOnly cookie and verifies role
// ============================================================
const authenticateAdmin = (req, res, next) => {
  try {
    // ✅ 1. Read token from COOKIE (not Authorization header!)
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'No authentication token found. Please login.'
      });
    }

    // ✅ 2. Verify JWT signature and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3. CRITICAL: Check role in payload
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Admin access required. Your role does not have permission.'
      });
    }

    // ✅ 4. Optionally: Check token expiration explicitly
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      // Clear expired cookie
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
      });
      
      return res.status(401).json({
        error: 'Token expired',
        message: 'Your session has expired. Please login again.'
      });
    }

    // ✅ 5. Attach user info to request for use in controllers
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role
    };

    next();

  } catch (error) {
    // Handle different JWT errors
    if (error.name === 'TokenExpiredError') {
      // Clear expired cookie
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
      });

      return res.status(401).json({
        error: 'Token expired',
        message: 'Your session has expired. Please login again.',
        expiredAt: error.expiredAt
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Authentication token is invalid or malformed.'
      });
    }

    // Generic error
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Unable to verify authentication token.'
    });
  }
};


// ============================================================
// Optional: Middleware for optional authentication
// Doesn't fail if no token, just adds req.user if valid token exists
// ============================================================
const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      // No token is fine, continue without req.user
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user if valid
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role
    };

    next();

  } catch (error) {
    // Token invalid, but don't fail - just continue without user
    next();
  }
};


// ============================================================
// Optional: Verify token without checking role
// Useful if you add multiple user types later
// ============================================================
const authenticateAny = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Please login to continue.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // No role check here - accepts any authenticated user
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role
    };

    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.clearCookie('auth_token');
      return res.status(401).json({ error: 'Token expired' });
    }

    return res.status(401).json({ error: 'Invalid token' });
  }
};


export { 
  authenticateAdmin,
  optionalAuth,
  authenticateAny
};