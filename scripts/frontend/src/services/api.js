import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const todoService = {
  getTodos: async () => {
    try {
      const response = await api.get('/api/todos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTodo: async (text) => {
    try {
      const response = await api.post('/api/todos', { text });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    try {
      const response = await api.put(`/api/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

