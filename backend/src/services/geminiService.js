const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI } = require("../config/environment");
const logger = require("../utils/logger");

class GeminiService {
  constructor() {
    if (!GEMINI.API_KEY) {
      logger.error("Gemini API Key is missing!");
    }
    this.genAI = new GoogleGenerativeAI(GEMINI.API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async analyze(prompt, jsonMode = true) {
    try {
      logger.info(`Sending request to Gemini AI...`);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      if (jsonMode) {
        // Clean markdown code blocks if present
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(text);
      }
      return text;
    } catch (error) {
      logger.error(`Gemini Analysis Error: ${error.message}`);
      throw new Error("AI Reasoning Failed");
    }
  }

  async classifyCrisis(signalData) {
    const prompt = `
      Analyze the following signals from Karachi city and detect if there is a crisis:
      Signals: ${JSON.stringify(signalData)}
      
      Focus on: Urban flooding, Traffic blockage, Road accidents.
      Return a JSON object:
      {
        "detected": boolean,
        "type": "Urban Flooding" | "Traffic Blockage" | "Road Accident" | "None",
        "confidence": number (0-1),
        "location": string,
        "summary": string,
        "reasoning": string
      }
    `;
    return this.analyze(prompt);
  }

  async planResponse(crisisData) {
    const prompt = `
      Based on this crisis detection, generate a response plan for Karachi emergency services:
      Crisis: ${JSON.stringify(crisisData)}
      
      Return a JSON object:
      {
        "priority": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
        "actions": [string],
        "resourcesRequired": [string],
        "estimatedResolutionTime": string,
        "safetyAlert": string
      }
    `;
    return this.analyze(prompt);
  }
}

module.exports = new GeminiService();
