// ============================================================
// FILE: backend/src/middleware/errorHandler.js
// PURPOSE: Global error handler - catches all errors
// WHAT IT DOES: Converts errors into user-friendly responses
// ============================================================

// ============================================================
// CONFIGURATION
// ============================================================

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Error logging service (optional - for production monitoring)
// Examples: Sentry, Rollbar, LogRocket, etc.
let errorLogger = null;

/**
 * Initialize error logging service
 * Call this from your main server file
 */
export const initErrorLogger = (logger) => {
  errorLogger = logger;
  console.log('✅ Error logging service initialized');
};


// ============================================================
// ERROR TYPES & STATUS CODES
// ============================================================

const ErrorTypes = {
  // Client errors (4xx)
  VALIDATION_ERROR: { code: 400, type: 'ValidationError' },
  AUTHENTICATION_ERROR: { code: 401, type: 'AuthenticationError' },
  AUTHORIZATION_ERROR: { code: 403, type: 'AuthorizationError' },
  NOT_FOUND: { code: 404, type: 'NotFoundError' },
  CONFLICT: { code: 409, type: 'ConflictError' },
  RATE_LIMIT: { code: 429, type: 'RateLimitError' },
  
  // Server errors (5xx)
  SERVER_ERROR: { code: 500, type: 'ServerError' },
  DATABASE_ERROR: { code: 500, type: 'DatabaseError' },
  EXTERNAL_SERVICE_ERROR: { code: 502, type: 'ExternalServiceError' },
};


// ============================================================
// CUSTOM ERROR CLASS
// ============================================================

/**
 * Custom application error class
 * Usage: throw new AppError('Resource not found', 404, 'NOT_FOUND')
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, type = 'SERVER_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.type = type;
    this.details = details;
    this.isOperational = true; // Operational errors vs programming errors
    
    Error.captureStackTrace(this, this.constructor);
  }
}


// ============================================================
// ERROR RESPONSE FORMATTER
// ============================================================

/**
 * Format error response based on environment
 */
const formatErrorResponse = (err, req) => {
  const baseResponse = {
    error: err.type || 'ServerError',
    message: err.message || 'An unexpected error occurred',
    statusCode: err.statusCode || 500,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  };
  
  // Add extra details in development
  if (isDevelopment) {
    return {
      ...baseResponse,
      stack: err.stack,
      details: err.details || null,
      requestBody: req.body,
      requestParams: req.params,
      requestQuery: req.query,
      user: req.user ? { id: req.user.id, email: req.user.email } : null
    };
  }
  
  // Production - minimal info for security
  return {
    error: baseResponse.error,
    message: baseResponse.message,
    statusCode: baseResponse.statusCode,
    timestamp: baseResponse.timestamp,
    // Include details only if it's a safe, operational error
    ...(err.isOperational && err.details && { details: err.details })
  };
};


// ============================================================
// ERROR LOGGERS
// ============================================================

/**
 * Log error to console with context
 */
const logErrorToConsole = (err, req) => {
  const logLevel = err.statusCode >= 500 ? '❌ ERROR' : '⚠️  WARNING';
  
  console.error('\n' + '='.repeat(60));
  console.error(`${logLevel} [${new Date().toISOString()}]`);
  console.error('='.repeat(60));
  console.error(`Message: ${err.message}`);
  console.error(`Type: ${err.type || err.name}`);
  console.error(`Status: ${err.statusCode || 500}`);
  console.error(`Path: ${req.method} ${req.originalUrl}`);
  console.error(`IP: ${req.ip}`);
  console.error(`User: ${req.user ? req.user.email : 'Anonymous'}`);
  
  if (err.details) {
    console.error(`Details:`, err.details);
  }
  
  if (isDevelopment) {
    console.error('\nStack Trace:');
    console.error(err.stack);
    
    if (Object.keys(req.body || {}).length > 0) {
      console.error('\nRequest Body:');
      console.error(JSON.stringify(req.body, null, 2));
    }
  }
  
  console.error('='.repeat(60) + '\n');
};

/**
 * Log error to external service (Sentry, LogRocket, etc.)
 */
const logErrorToService = (err, req) => {
  if (!errorLogger || !isProduction) return;
  
  try {
    errorLogger.captureException(err, {
      extra: {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        user: req.user,
        body: req.body,
        params: req.params,
        query: req.query
      }
    });
  } catch (loggingError) {
    console.error('Failed to log error to external service:', loggingError);
  }
};


// ============================================================
// SPECIFIC ERROR HANDLERS
// ============================================================

/**
 * Handle Multer file upload errors
 */
const handleMulterError = (err) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return new AppError(
      'File too large. Maximum file size is 5MB',
      400,
      'VALIDATION_ERROR',
      { maxSize: '5MB', field: err.field }
    );
  }
  
  if (err.code === 'LIMIT_FILE_COUNT') {
    return new AppError(
      `Too many files. Maximum ${err.limit} files allowed`,
      400,
      'VALIDATION_ERROR'
    );
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return new AppError(
      `Unexpected field: ${err.field}`,
      400,
      'VALIDATION_ERROR'
    );
  }
  
  return new AppError(
    'File upload failed',
    400,
    'VALIDATION_ERROR'
  );
};

/**
 * Handle JWT authentication errors
 */
const handleJWTError = (err) => {
  if (err.name === 'JsonWebTokenError') {
    return new AppError(
      'Invalid authentication token',
      401,
      'AUTHENTICATION_ERROR'
    );
  }
  
  if (err.name === 'TokenExpiredError') {
    return new AppError(
      'Authentication token has expired. Please login again',
      401,
      'AUTHENTICATION_ERROR',
      { expiredAt: err.expiredAt }
    );
  }
  
  if (err.name === 'NotBeforeError') {
    return new AppError(
      'Token not yet valid',
      401,
      'AUTHENTICATION_ERROR'
    );
  }
  
  return err;
};

/**
 * Handle PostgreSQL database errors
 */
const handleDatabaseError = (err) => {
  // Unique constraint violation (duplicate key)
  if (err.code === '23505') {
    const match = err.detail?.match(/Key \((.*?)\)=\((.*?)\)/);
    const field = match ? match[1] : 'field';
    const value = match ? match[2] : 'value';
    
    return new AppError(
      `A record with this ${field} already exists`,
      409,
      'CONFLICT',
      { field, value: isProduction ? undefined : value }
    );
  }
  
  // Foreign key constraint violation
  if (err.code === '23503') {
    const match = err.detail?.match(/Key \((.*?)\)=\((.*?)\)/);
    const field = match ? match[1] : 'field';
    
    return new AppError(
      `Referenced ${field} does not exist`,
      400,
      'VALIDATION_ERROR',
      { field }
    );
  }
  
  // Not null constraint violation
  if (err.code === '23502') {
    const field = err.column || 'field';
    return new AppError(
      `${field} is required`,
      400,
      'VALIDATION_ERROR',
      { field }
    );
  }
  
  // Check constraint violation
  if (err.code === '23514') {
    return new AppError(
      'Data validation failed',
      400,
      'VALIDATION_ERROR',
      { constraint: err.constraint }
    );
  }
  
  // Connection errors
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return new AppError(
      'Database connection failed',
      500,
      'DATABASE_ERROR'
    );
  }
  
  // Syntax errors (programming error!)
  if (err.code === '42601' || err.code === '42P01') {
    console.error('⚠️  SQL SYNTAX ERROR - THIS IS A BUG!');
    return new AppError(
      'Database query error',
      500,
      'DATABASE_ERROR',
      isDevelopment ? { query: err.query } : null
    );
  }
  
  // Generic database error
  if (err.name === 'DatabaseError' || err.code) {
    return new AppError(
      'Database operation failed',
      500,
      'DATABASE_ERROR',
      isDevelopment ? { code: err.code } : null
    );
  }
  
  return err;
};

/**
 * Handle Zod validation errors
 */
const handleValidationError = (err) => {
  if (err.name === 'ZodError') {
    const details = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
      code: e.code
    }));
    
    return new AppError(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      details
    );
  }
  
  return err;
};

/**
 * Handle Express-specific errors
 */
const handleExpressError = (err) => {
  // Body parser errors
  if (err.type === 'entity.parse.failed') {
    return new AppError(
      'Invalid JSON in request body',
      400,
      'VALIDATION_ERROR'
    );
  }
  
  if (err.type === 'entity.too.large') {
    return new AppError(
      'Request body too large',
      413,
      'VALIDATION_ERROR'
    );
  }
  
  // CORS errors
  if (err.message?.includes('CORS')) {
    return new AppError(
      'CORS error - request blocked',
      403,
      'AUTHORIZATION_ERROR'
    );
  }
  
  return err;
};


// ============================================================
// MAIN ERROR HANDLER MIDDLEWARE
// ============================================================

/**
 * Global error handler - catches all errors
 * This must be the LAST middleware in your app
 */
export const errorHandler = (err, req, res, next) => {
  // Skip if response already sent
  if (res.headersSent) {
    return next(err);
  }
  
  // Transform error into AppError if needed
  let error = err;
  
  // Handle specific error types
  if (err.code && err.code.startsWith('LIMIT_')) {
    error = handleMulterError(err);
  } else if (err.name?.includes('JsonWebToken') || err.name === 'TokenExpiredError') {
    error = handleJWTError(err);
  } else if (err.code || err.name === 'DatabaseError') {
    error = handleDatabaseError(err);
  } else if (err.name === 'ZodError') {
    error = handleValidationError(err);
  } else if (err.type) {
    error = handleExpressError(err);
  }
  
  // Ensure error has required properties
  if (!(error instanceof AppError)) {
    error = new AppError(
      error.message || 'An unexpected error occurred',
      error.statusCode || 500,
      'SERVER_ERROR'
    );
    error.stack = err.stack;
  }
  
  // Log the error
  logErrorToConsole(error, req);
  logErrorToService(error, req);
  
  // Send response
  const response = formatErrorResponse(error, req);
  res.status(error.statusCode || 500).json(response);
};


// ============================================================
// 404 NOT FOUND HANDLER
// ============================================================

/**
 * Handles requests to non-existent routes
 * Place this BEFORE errorHandler but AFTER all other routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(
    `Route ${req.method} ${req.originalUrl} not found`,
    404,
    'NOT_FOUND',
    {
      availableRoutes: isDevelopment ? [
        '/api/properties',
        '/api/inquiries',
        '/api/admin',
        '/api-docs'
      ] : undefined
    }
  );
  
  next(error);
};


// ============================================================
// ASYNC ERROR WRAPPER
// ============================================================

/**
 * Wraps async route handlers to catch errors automatically
 * Usage: router.get('/path', asyncHandler(async (req, res) => { ... }))
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


// ============================================================
// ERROR CREATION HELPERS
// ============================================================

/**
 * Quick error creators for common scenarios
 */
export const createError = {
  notFound: (resource = 'Resource') => 
    new AppError(`${resource} not found`, 404, 'NOT_FOUND'),
  
  unauthorized: (message = 'Authentication required') => 
    new AppError(message, 401, 'AUTHENTICATION_ERROR'),
  
  forbidden: (message = 'Access denied') => 
    new AppError(message, 403, 'AUTHORIZATION_ERROR'),
  
  validation: (message, details = null) => 
    new AppError(message, 400, 'VALIDATION_ERROR', details),
  
  conflict: (message) => 
    new AppError(message, 409, 'CONFLICT'),
  
  serverError: (message = 'Internal server error') => 
    new AppError(message, 500, 'SERVER_ERROR'),
  
  rateLimit: (message = 'Too many requests') => 
    new AppError(message, 429, 'RATE_LIMIT'),
};


// ============================================================
// GRACEFUL SHUTDOWN
// ============================================================

/**
 * Handle uncaught exceptions and unhandled rejections
 */
export const setupProcessErrorHandlers = () => {
  // Uncaught exceptions (synchronous errors not in try-catch)
  process.on('uncaughtException', (error) => {
    console.error('\n' + '🚨 '.repeat(30));
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    console.error('🚨 '.repeat(30));
    console.error(error);
    console.error('Stack:', error.stack);
    console.error('🚨 '.repeat(30) + '\n');
    
    // In production, give time for logging then exit
    if (isProduction) {
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  });
  
  // Unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('\n' + '⚠️ '.repeat(30));
    console.error('UNHANDLED PROMISE REJECTION!');
    console.error('⚠️ '.repeat(30));
    console.error('Reason:', reason);
    console.error('Promise:', promise);
    console.error('⚠️ '.repeat(30) + '\n');
    
    // In production, exit gracefully
    if (isProduction) {
      console.error('Shutting down gracefully...');
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  });
  
  // Graceful shutdown signals
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Closing server gracefully...`);
    
    // Give requests time to finish (10 seconds)
    setTimeout(() => {
      console.log('Server closed. Exiting process.');
      process.exit(0);
    }, 10000);
  };
  
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};


// ============================================================
// EXPORTS
// ============================================================

export default {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  AppError,
  createError,
  initErrorLogger,
  setupProcessErrorHandlers
};
/** 
 * 
```

---

## 🧠 How Error Handling Works (Simple Explanation)

### The Real-World Analogy

Think of error handling like a **safety net at a circus**:
```
Without Error Handler:
═══════════════════════════════════
Acrobat falls → Crashes to ground → Show stops → Everyone panics!
Result: Server crashes, users see nothing, no logs 💀


With Error Handler:
═══════════════════════════════════
Acrobat falls → Caught by safety net → Helped down safely → Show continues!
Result: Error logged, user sees friendly message, server keeps running ✅
```

---

## 📊 The Error Flow
```
┌─────────────────────────────────────────────────────────────┐
│ 1. ERROR OCCURS IN YOUR CODE                               │
└─────────────────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Express catches it (if you use asyncHandler)            │
│    OR you throw it manually: throw new AppError(...)       │
└─────────────────────────────────────────────────────────────┘
      ↓
      ┌─────────────────────────────────────────────────────────────┐
      │ 3. Error bubbles up through middleware chain                │
      └─────────────────────────────────────────────────────────────┘
      ↓
      ┌─────────────────────────────────────────────────────────────┐
      │ 4. errorHandler middleware catches it (LAST middleware)    │
      └─────────────────────────────────────────────────────────────┘
      ↓
      ┌─────────────────────────────────────────────────────────────┐
      │ 5. Identify error type (DB? JWT? Validation?)              │
      └─────────────────────────────────────────────────────────────┘
      ↓
      ┌─────────────────────────────────────────────────────────────┐
      │ 6. Transform into user-friendly AppError                    │
      └─────────────────────────────────────────────────────────────┘
      ↓
      ┌─────────────────────────────────────────────────────────────┐
      │ 7. Log to console + external service (Sentry)              │
      └─────────────────────────────────────────────────────────────┘
      ↓
      ┌─────────────────────────────────────────────────────────────┐
      │ 8. Send JSON response to user                              │
      │    Development: Full details + stack trace                  │
      │    Production: Minimal info (security)                      │
      └─────────────────────────────────────────────────────────────┘
      */