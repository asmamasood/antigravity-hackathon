const logger = require('../utils/logger');
const { AGENT_NAMES } = require('../utils/constants');

class OutcomeAgent {
  constructor() {
    this.name = AGENT_NAMES.OUTCOME;
  }

  async run(crisisData, executionData) {
    logger.info(`[${this.name}] Predicting outcomes and impact reduction...`);
    
    if (!executionData.executed) {
      return { 
        before: { congestion: '90%', safety: 'LOW' },
        after: { congestion: '90%', safety: 'LOW' },
        summary: "No actions taken, no improvement predicted."
      };
    }

    // Heuristic for outcome prediction
    const baseCongestion = 90;
    const reduction = crisisData.type === 'Urban Flooding' ? 40 : 60;
    const finalCongestion = baseCongestion - reduction;

    const outcome = {
      before: {
        congestion: `${baseCongestion}%`,
        responseTime: '45 mins',
        safetyRating: '2/10'
      },
      after: {
        congestion: `${finalCongestion}%`,
        responseTime: '12 mins',
        safetyRating: '8/10'
      },
      improvement: {
        efficiency: `${reduction}%`,
        timeSaved: '33 mins'
      },
      summary: `AI Orchestration successfully reduced ${crisisData.type} impact by ${reduction}%. Response time improved significantly due to automated rerouting.`
    };

    logger.info(`[${this.name}] Outcome prediction complete.`);
    return outcome;
  }
}

module.exports = new OutcomeAgent();
