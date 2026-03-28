import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app = express();

// Global Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://willowy-sunshine-1e4e12.netlify.app', 
    'https://willowy-sunshine-1e4e12.netlify.app/',
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : null
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(express.json()); // Body parser

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 3000, // Increased limit for heavy local development
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api', limiter);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Flipkart Clone API is running' });
});

// We will mount routes here later...

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
