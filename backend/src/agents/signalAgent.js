const fs = require('fs');
const path = require('path');
const weatherService = require('../services/weatherService');
const logger = require('../utils/logger');
const { AGENT_NAMES } = require('../utils/constants');

class SignalAgent {
  constructor() {
    this.name = AGENT_NAMES.SIGNAL;
  }

  async run() {
    logger.info(`[${this.name}] Starting signal collection...`);
    
    try {
      const socialPosts = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/socialPosts.json'), 'utf8'));
      const traffic = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/traffic.json'), 'utf8'));
      const liveWeather = await weatherService.getKarachiWeather();

      const normalizedSignals = [
        ...socialPosts.map(p => ({ type: 'social', content: p.text, source: p.source, time: p.timestamp })),
        { type: 'weather', content: `Condition: ${liveWeather.condition} (${liveWeather.description}), Temp: ${liveWeather.temp}°C`, source: 'OpenWeather API', time: liveWeather.timestamp },
        ...traffic.filter(t => t.status !== 'Normal').map(t => ({ type: 'traffic', content: `${t.road}: ${t.status} (${t.reason})`, source: 'Traffic Police', time: new Date().toISOString() }))
      ];

      logger.info(`[${this.name}] Collected ${normalizedSignals.length} crisis signals.`);
      return normalizedSignals;
    } catch (error) {
      logger.error(`[${this.name}] Collection failed: ${error.message}`);
      return [];
    }
  }
}

module.exports = new SignalAgent();
