import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the API service
jest.mock('../services/api', () => ({
  todoService: {
    getTodos: jest.fn(() => Promise.resolve([])),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn()
  }
}));

describe('App Component', () => {
  test('renders todo app header', () => {
    render(<App />);
    expect(screen.getByText('📝 My Todo App')).toBeInTheDocument();
  });

  test('renders todo list component', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter a new todo...')).toBeInTheDocument();
  });

  test('renders app description', () => {
    render(<App />);
    expect(screen.getByText('A simple todo app built with React & Node.js')).toBeInTheDocument();
  });
});

