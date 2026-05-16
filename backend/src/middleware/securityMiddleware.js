const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { SECURITY } = require('../config/environment');

const limiter = rateLimit({
  windowMs: SECURITY.RATE_LIMIT_WINDOW,
  max: SECURITY.RATE_LIMIT_MAX,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const securityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Enable CORS
  app.use(cors({
    origin: '*', // In production, replace with specific domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Apply rate limiting to all requests
  app.use('/api', limiter);
};

module.exports = securityMiddleware;
