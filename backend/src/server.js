require('dotenv').config();
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';  // ← ADD THIS
import { setupSwagger } from './config/swagger';

// Import routes
import propertyRoutes from './routes/properties';
import inquiryRoutes from './routes/inquiries';
import adminRoutes from './routes/admin';
import analyticsRoutes from './routes/analytics';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security Middleware ───────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// ─── CORS Configuration (CRITICAL FOR PRODUCTION) ──────────
const allowedOrigins = [
  'http://localhost:3000',              // Development frontend
  'http://localhost:3001',              // Development API
  process.env.FRONTEND_URL,             // Production frontend
  'https://yourdomain.com',             // Production (set in .env)
  'https://www.yourdomain.com'          // Production with www
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,                    // ← CRITICAL: Allow cookies!
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400 // 24 hours preflight cache
}));

// Handle preflight requests explicitly
app.options('*', cors());

// ─── Cookie Parser (MUST be before routes) ─────────────────
app.use(cookieParser());  // ← Parse cookies from req.cookies

// ─── Body Parsing ─────────────────────────────────────────
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));

// ─── Rate Limiting ────────────────────────────────────────
app.use('/api/', apiLimiter);

// ─── Request Logger (Dev only) ────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    if (req.cookies.auth_token) {
      console.log('  ✓ Auth cookie present');
    }
    next();
  });
}

// ─── Health Check ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: Math.floor(process.uptime()) + ' seconds',
    cors: allowedOrigins.length > 0 ? 'configured' : 'not configured'
  });
});

// ─── API Routes ───────────────────────────────────────────
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// ─── Swagger API Documentation ────────────────────────────
setupSwagger(app);

// ─── 404 Handler ──────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    message: 'The requested endpoint does not exist'
  });
});

// ─── Global Error Handler (must be last) ──────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('🚀 Real Estate API Server Started!');
  console.log('═══════════════════════════════════════');
  console.log(`📡 API:       http://localhost:${PORT}/api`);
  console.log(`🏥 Health:    http://localhost:${PORT}/health`);
  console.log(`📚 API Docs:  http://localhost:${PORT}/api-docs`);
  console.log(`🌍 Env:       ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 CORS:      ${allowedOrigins.length} origins allowed`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`   Allowed:  ${allowedOrigins.join(', ')}`);
  }
  console.log('═══════════════════════════════════════');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

export default app;
