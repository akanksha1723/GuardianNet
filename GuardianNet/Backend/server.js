import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './src/config/db.js';
import authRoutes       from './src/module1/routes/authRoutes.js';
import dashboardRoutes  from './src/module2/routes/dashboardRoutes.js';
import volunteerRoutes  from './src/module3/routes/volunteerRoutes.js';
import emergencyRoutes  from './src/module4/routes/emergencyRoutes.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests.' },
});
app.use('/api', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many login attempts.' },
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GuardianNet API is running',
    environment: process.env.NODE_ENV,
  });
});

// ── Routes ───────────────────────────────────
app.use('/api/auth',       authLimiter, authRoutes);
app.use('/api/dashboard',  dashboardRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/emergency',  emergencyRoutes);

// ── Module 5+ added below ────────────────────
// app.use('/api/maps', mapsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 GuardianNet server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.CLIENT_URL}`);
});