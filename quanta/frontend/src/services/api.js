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
export const fetchGlossaryTerms = async (page = 1, perPage = 10) => {
  try {
    const response = await fetch(`/api/glossary?page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      data: data.data || [], // The glossary terms
      pagination: data.pagination || {
        current_page: page,
        total_pages: 1,
        total_items: data.data?.length || 0
      },
      success: data.success
    };
  } catch (error) {
    console.error("Error fetching glossary terms:", error);
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