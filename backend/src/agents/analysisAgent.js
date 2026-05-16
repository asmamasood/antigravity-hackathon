const logger = require('../utils/logger');
const { AGENT_NAMES, SEVERITY_LEVELS } = require('../utils/constants');

class AnalysisAgent {
  constructor() {
    this.name = AGENT_NAMES.ANALYSIS;
  }

  async run(crisisData) {
    logger.info(`[${this.name}] Estimating impact and severity...`);
    
    if (!crisisData.detected) {
      return { severity: SEVERITY_LEVELS.LOW, impact: [] };
    }

    // Logic for severity estimation
    let severity = SEVERITY_LEVELS.MEDIUM;
    let impact = ["Potential traffic disruption", "Minor public inconvenience"];

    if (crisisData.confidence > 0.8) {
      severity = SEVERITY_LEVELS.HIGH;
      impact.push("High risk to property", "Emergency services required");
    }

    if (crisisData.type === 'Urban Flooding') {
      severity = SEVERITY_LEVELS.CRITICAL;
      impact.push("Major road blockages", "Stranded vehicles", "Electricity hazard");
    }

    logger.info(`[${this.name}] Severity determined: ${severity}`);
    return { severity, impact };
  }
}

module.exports = new AnalysisAgent();
