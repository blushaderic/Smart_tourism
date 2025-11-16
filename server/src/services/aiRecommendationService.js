const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

exports.getRecommendations = async (preferences) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/api/recommendations`,
      preferences
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get AI recommendations');
  }
};

exports.analyzePreferences = async (text) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/analyze`, {
      text,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to analyze preferences');
  }
};

