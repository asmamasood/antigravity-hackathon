const { v4: uuidv4 } = require('uuid');
const signalAgent = require('../agents/signalAgent');
const detectionAgent = require('../agents/detectionAgent');
const analysisAgent = require('../agents/analysisAgent');
const planningAgent = require('../agents/planningAgent');
const executionAgent = require('../agents/executionAgent');
const outcomeAgent = require('../agents/outcomeAgent');
const firebaseService = require('../services/firebaseService');
const logger = require('../utils/logger');

class CrisisWorkflow {
  async execute() {
    const workflowId = uuidv4();
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

    logger.info(`[Workflow:${workflowId}] Starting CIRO Orchestration Pipeline...`);

    try {
      // 1. Signal Collection
      const signals = await signalAgent.run();

      // 2. Crisis Detection
      const crisis = await detectionAgent.run(signals);

      // 3. Severity Analysis
      const analysis = await analysisAgent.run(crisis);

      // 4. Action Planning
      const actions = await planningAgent.run(crisis, analysis);

      // 5. Execution Simulation
      const execution = await executionAgent.run(actions);

      // 6. Outcome Prediction
      const outcome = await outcomeAgent.run(crisis, execution);

      const duration = Date.now() - startTime;
      
      const result = {
        success: true,
        workflowId,
        timestamp,
        duration: `${duration}ms`,
        crisis,
        analysis,
        actions,
        execution,
        outcome
      };

      // Save to Firebase (Async)
      firebaseService.save('workflows', result).catch(err => {
        logger.error(`Failed to persist workflow to Firebase: ${err.message}`);
      });

      logger.info(`[Workflow:${workflowId}] Pipeline completed successfully in ${duration}ms.`);
      return result;

    } catch (error) {
      logger.error(`[Workflow:${workflowId}] Pipeline failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new CrisisWorkflow();
