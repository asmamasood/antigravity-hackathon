const crisisWorkflow = require('../workflows/crisisWorkflow');
const firebaseService = require('../services/firebaseService');
const weatherService = require('../services/weatherService');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

exports.orchestrateCrisis = async (req, res, next) => {
  try {
    const result = await crisisWorkflow.execute();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getSignals = async (req, res) => {
  try {
    const social = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/socialPosts.json'), 'utf8'));
    const traffic = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/traffic.json'), 'utf8'));
    const weather = await weatherService.getKarachiWeather();
    
    res.status(200).json({ social, weather, traffic });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch signals" });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logPath = path.join(__dirname, '../logs/workflow.log');
    if (!fs.existsSync(logPath)) return res.json({ logs: [] });
    
    const logs = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean).slice(-50);
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch logs" });
  }
};

exports.getHealth = (req, res) => {
  res.status(200).json({ 
    status: "UP", 
    timestamp: new Date().toISOString(),
    service: "CIRO Backend"
  });
};
