const app = require('./app');
const { PORT, NODE_ENV } = require('./config/environment');
const logger = require('./utils/logger');

const server = app.listen(PORT, () => {
  logger.info(`
    🚀 CIRO Backend Server Started
    -----------------------------------
    URL: http://localhost:${PORT}
    ENV: ${NODE_ENV}
    TIME: ${new Date().toLocaleString()}
    -----------------------------------
  `);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
