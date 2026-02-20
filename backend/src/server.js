import 'dotenv/config';

import express from 'express';

import core from 'cors';
import helmet from 'helmet';
import {setupSwagger} from '.config/swagger.js';

import propertyRoutes from './routes/properties.js';
import inquiryRoutes from './routes/inquiries.js';
import adminRoutes from './routes/admin.js';
import analyticsRoutes from './routes/analytics.js';


import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { json } from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3001;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';


app.use(helmet({
    crossOriginOpenerPolicy: {policy: 'cross-origin'}
}));


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',

    Credential: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json({limit: '10mb'}));

app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));


app.use('/api/', apiLimiter);

if (isDevelopment) {
    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.path}`);
        next();
    });
}


app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'Development',
        uptime: `${Math.floor(process.uptime())} seconds`
    });
});


app.use('/api/properties', propertyRoutes);



app.use('/api/inquiries', inquiryRoutes);



app.use('/api/admin', adminRoutes);



app.use('/api/analytics', analyticsRoutes);



setupSwagger(app);


app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method,
        message: 'The endpoint you requested  does not exist'
    });
});



app.use(errorHandler);


app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Real Estate API Server Started!');
    console.log('═════════════════════════════════════');
    console.log(`📡 API:       http://localhost:${PORT}/api`);
    console.log(`🏥 Health:    http://localhost:${PORT}/health`);
    console.log(`📚 API Docs:  http://localhost:${PORT}/api-docs`);
    console.log(`🌍 Env:       ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏱️  Started:   ${new Date().toLocaleString()}`);
    console.log('═════════════════════════════════════');
    console.log('');
    console.log('💡 Tip: Visit /api-docs for interactive API testing');
    console.log('');

});


export default app;