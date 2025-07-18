// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.response?.data);
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data.message || 'Invalid request');
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(data.message || 'An error occurred');
    }
  }
);

export const todoService = {
  // Get all todos
  getTodos: async () => {
    try {
      const response = await api.get('/api/todos');
      return response.data;
    } catch (error) {
      console.error('Get todos failed:', error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (text) => {
    try {
      const response = await api.post('/api/todos', { text });
      return response.data;
    } catch (error) {
      console.error('Create todo failed:', error);
      throw error;
    }
  },

  // Update todo
  updateTodo: async (id, updates) => {
    try {
      const response = await api.put(`/api/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Update todo failed:', error);
      throw error;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
      return true;
    } catch (error) {
      console.error('Delete todo failed:', error);
      throw error;
    }
  }
};

export default api;

