/**
 * Formats crisis response data for API delivery
 */
exports.formatCrisisResponse = (data) => {
  return {
    success: true,
    timestamp: new Date().toISOString(),
    ...data
  };
};

/**
 * Normalizes text for better AI classification
 */
exports.normalizeText = (text) => {
  return text.toLowerCase().trim().replace(/[^\w\s]/gi, '');
};
