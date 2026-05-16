const express = require('express');
const router = express.Router();
const crisisController = require('../controllers/crisisController');

// Main Orchestration Endpoint
router.get('/crisis', crisisController.orchestrateCrisis);

// Data Endpoints
router.get('/signals', crisisController.getSignals);
router.get('/logs', crisisController.getLogs);
router.get('/health', crisisController.getHealth);

module.exports = router;
