const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  GEMINI: {
    API_KEY: process.env.GEMINI_API_KEY,
  },
  FIREBASE: {
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  SECURITY: {
    RATE_LIMIT_WINDOW: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS) || 900000,
    RATE_LIMIT_MAX: parseInt(process.env.API_RATE_LIMIT_MAX) || 100,
  }
};
