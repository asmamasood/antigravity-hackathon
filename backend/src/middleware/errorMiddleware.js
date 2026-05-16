const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[API Error] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorMiddleware;
