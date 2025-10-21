import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
);

// API functions
export const saveScore = async (scoreData) => {
  try {
    const response = await api.post('/scores', scoreData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to save score');
  }
};

export const getScores = async (page = 1, limit = 10, sortBy = 'percentage', sortOrder = 'desc') => {
  try {
    const response = await api.get('/scores', {
      params: { page, limit, sortBy, sortOrder }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch scores');
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await api.get('/scores/leaderboard');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard');
  }
};

export const deleteScore = async (scoreId) => {
  try {
    const response = await api.delete(`/scores/${scoreId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete score');
  }
};

// Health check function
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('API health check failed');
  }
};

export default api;