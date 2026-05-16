const geminiService = require('../services/geminiService');
const logger = require('../utils/logger');
const { AGENT_NAMES } = require('../utils/constants');

class PlanningAgent {
  constructor() {
    this.name = AGENT_NAMES.PLANNING;
  }

  async run(crisisData, analysisData) {
    logger.info(`[${this.name}] Generating emergency response plan...`);
    
    if (!crisisData.detected) return { actions: [], priority: 'LOW' };

    try {
      const plan = await geminiService.planResponse({ ...crisisData, ...analysisData });
      logger.info(`[${this.name}] Plan generated with ${plan.actions.length} actions.`);
      return plan;
    } catch (error) {
      logger.error(`[${this.name}] Planning failed: ${error.message}`);
      return { 
        actions: ["Dispatch local police", "Monitor situation"], 
        priority: 'MEDIUM',
        error: "AI Planning Fallback"
      };
    }
  }
}

module.exports = new PlanningAgent();
