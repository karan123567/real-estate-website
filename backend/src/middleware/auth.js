import jwt from 'jsonwebtoken';

// ============================================================
// TOKEN BLACKLIST (for logout functionality)
// In production, use Redis instead of this Set
// ============================================================

const tokenBlacklist = new Set();

/**
 * Add token to blacklist (used when usr logs out)
 */

export const blacklistToken = (token) => {
    tokenBlacklist.add(token);
};


/**
 * Check if token is blacklisted
 */

const isTokenBlacklisted = (token) => {
    return tokenBlacklist.has(token);
};

// ============================================================
// MAIN AUTHENTICATION MIDDLEWARE
// ============================================================


/**
 * Authenticate admin users
 * Usage: app.get('/api/admin/dashboard', authenticateAdmin, controller)
 */

export const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                error: 'Access denied',
                message: 'No authentication token provided',
                hint: 'Include Authorization header with Bearer token'
            });
        }

        // Check if it follows "Bearer Token" format
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Invalid format',
                message: 'Authorization header must start with "Bearer "',
                hint: 'Format: Authorization: Bearer <your-token>'
            });
        }

        // Extract the actual token (everything after "Bearer ")
        const token = authHeader.split(' ')[1];

        //Check if token is empty
        if(!token || token === 'null' || token  === 'undefined') {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Token is missing or malformed'
            });
        }

        // -----STEP 2: Check if Token is Blacklisted -----------------
        if (isTokenBlacklisted(token)) {
            return res.status(401).json({
                error: 'Token invalidated',
                message: 'This token has been logged out. Please login again.'
            });
        }

        // -----STEP 3: Verify Token Signature ------------------------
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // ----STEP 4: Validate Token Payload -------------------------
        // Check if required fields exist
        if (!decoded.id || !decoded.role) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Token  payload is missing required fields'
            });
        }

        // ----- STEP 5: Check Role Authorization ---------------------
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                error: 'forbidden',
                message: 'Admin access required',
                currentRole: decoded.role
            });
        }

        // ---- STEP 6: Check Token Expiration (Extra Safety) -------
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Your session has expired. Please login again.',
                expiredAt: new Date(decoded.exp * 1000).toISOString()
            });
        }

        // ----STEP 7: Attach User Info to Request ------------------
        // Controllers can now access req.user
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
            tokenIssuedAt: decoded.iat,
            tokenExpiresAt: decoded.exp
        };

        // ----STEP 8: log Access (Development Only) ----------------
        if (process.env.NODE_ENV === 'development') {
            console.log(`Admin authenticated: ${decoded.email} (ID: ${decoded.id})`);
        }

        // ---- SUCCESS: Move to Next Middleware/Controller ---------
        next();

    } catch (error) {
        // ===== ERROR HANDLING =========================\
        // Token has expired
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Your session has expired. Please login again.',
                expiredAt: error.expiredAt
            });
        }
    }
}
