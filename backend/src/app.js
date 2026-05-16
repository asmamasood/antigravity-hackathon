const express = require('express');
const morgan = require('morgan');
const crisisRoutes = require('./routes/crisisRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const securityMiddleware = require('./middleware/securityMiddleware');
const logger = require('./utils/logger');

const app = express();

// Security & Middlewares
securityMiddleware(app);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to CIRO — Crisis Intelligence & Response Orchestrator" });
});

// API Routes
app.use('/api', crisisRoutes);

// Error Handling
app.use(errorMiddleware);

module.exports = app;
