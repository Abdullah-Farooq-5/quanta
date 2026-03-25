import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check endpoint to verify API connectivity
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};

// Fetch glossary terms
export const fetchGlossaryTerms = async () => {
  try {
    const response = await api.get('/glossary');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch glossary terms:', error);
    throw error;
  }
};

// Fetch quiz questions by difficulty level
export const fetchQuizQuestions = async (level = 'all') => {
  try {
    const response = await api.get('/quiz', {
      params: { level }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch quiz questions:', error);
    throw error;
  }
};

// Submit a circuit for simulation
export const simulateCircuit = async (circuitData) => {
  try {
    const response = await api.post('/simulate', circuitData);
    return response.data;
  } catch (error) {
    console.error('Circuit simulation failed:', error);
    throw error;
  }
};

export default api;