const geminiService = require('../services/geminiService');
const logger = require('../utils/logger');
const { AGENT_NAMES } = require('../utils/constants');

class DetectionAgent {
  constructor() {
    this.name = AGENT_NAMES.DETECTION;
  }

  async run(signals) {
    logger.info(`[${this.name}] Analyzing signals for crisis detection...`);
    
    if (!signals || signals.length === 0) {
      return { detected: false, type: 'None', confidence: 0 };
    }

    try {
      const detectionResult = await geminiService.classifyCrisis(signals);
      logger.info(`[${this.name}] Detection complete: ${detectionResult.type} (Confidence: ${detectionResult.confidence})`);
      return detectionResult;
    } catch (error) {
      logger.error(`[${this.name}] Detection failed: ${error.message}`);
      // Fallback logic
      return { detected: false, type: 'Error', confidence: 0, reasoning: 'AI failed to respond' };
    }
  }
}

module.exports = new DetectionAgent();
