import axios from 'axios';

const AI_SERVICE_URL = process.env.REACT_APP_AI_SERVICE_URL || 'http://localhost:5001';

const aiApi = axios.create({
  baseURL: AI_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiService = {
  getRecommendations: async (preferences) => {
    const response = await aiApi.post('/api/recommendations', preferences);
    return response.data;
  },

  analyzePreferences: async (text) => {
    const response = await aiApi.post('/api/analyze', { text });
    return response.data;
  },

  getPersonalizedSuggestions: async (userId, context) => {
    const response = await aiApi.post('/api/personalize', { userId, context });
    return response.data;
  },
};

