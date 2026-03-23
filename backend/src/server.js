import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { closePool } from './models/db.js';  // ← Import closePool

// Import routes
import propertyRoutes from './routes/properties.js';
import inquiryRoutes from './routes/inquiries.js';
import adminRoutes from './routes/admin.js';
import analyticsRoutes from './routes/analytics.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security Middleware ───────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// ─── CORS Configuration ────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  'https://www.parthestatemart.com',
  'https://parthestatemart.com',
  'https://vercel.com/karan123567s-projects/real-estate-website-bh2e/6HY5KKpWcXdHS2MkLbEVuCScQ5yV'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400
}));

// ─── Cookie Parser ─────────────────────────────────────────
app.use(cookieParser());

// ─── Body Parsing ──────────────────────────────────────────
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));

// ─── Rate Limiting ─────────────────────────────────────────
app.use('/api/', apiLimiter);

// ─── Request Logger (Dev only) ─────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    if (req.cookies.auth_token) {
      console.log('  ✓ Auth cookie present');
    }
    next();
  });
}

// ─── Health Check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: Math.floor(process.uptime()) + ' seconds',
    cors: allowedOrigins.length > 0 ? 'configured' : 'not configured'
  });
});

// ─── API Routes ────────────────────────────────────────────
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// ─── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    message: 'The requested endpoint does not exist'
  });
});

// ─── Global Error Handler (must be last) ───────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
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

// ─── Graceful Shutdown ─────────────────────────────────────
process.on('SIGTERM', async () => {
  console.log('SIGTERM received: shutting down gracefully');
  try {
    await closePool();
    console.log('Database connections closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err.message);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('SIGINT received: shutting down gracefully');
  try {
    await closePool();
    console.log('Database connections closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err.message);
    process.exit(1);
  }
});

export default app;