/**
 * Delays execution (useful for simulating processing)
 */
exports.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random probability
 */
exports.getRandomConfidence = () => parseFloat((Math.random() * (0.99 - 0.70) + 0.70).toFixed(2));

/**
 * Validates Karachi coordinates
 */
exports.isValidKarachiCoord = (lat, lng) => {
  return lat >= 24.7 && lat <= 25.1 && lng >= 66.8 && lng <= 67.3;
};
