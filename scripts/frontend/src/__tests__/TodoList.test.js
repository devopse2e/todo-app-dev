import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Mock the API service
const mockTodoService = {
  getTodos: jest.fn(),
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn()
};

jest.mock('../services/api', () => ({
  todoService: mockTodoService
}));

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state initially', async () => {
    mockTodoService.getTodos.mockResolvedValue([]);
    
    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
  });

  test('renders todos when loaded', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo 1', completed: false },
      { id: 2, text: 'Test todo 2', completed: true }
    ];
    
    mockTodoService.getTodos.mockResolvedValue(mockTodos);
    
    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test todo 1')).toBeInTheDocument();
      expect(screen.getByText('Test todo 2')).toBeInTheDocument();
    });
  });

  test('displays loading state', () => {
    mockTodoService.getTodos.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<TodoList />);
    
    expect(screen.getByText('Loading todos...')).toBeInTheDocument();
  });

  test('displays error state', async () => {
    mockTodoService.getTodos.mockRejectedValue(new Error('API Error'));
    
    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load todos')).toBeInTheDocument();
    });
  });

  test('adds new todo', async () => {
    const newTodo = { id: 1, text: 'New todo', completed: false };
    
    mockTodoService.getTodos.mockResolvedValue([]);
    mockTodoService.createTodo.mockResolvedValue(newTodo);
    
    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(mockTodoService.createTodo).toHaveBeenCalledWith('New todo');
    });
  });

  test('shows todo stats', async () => {
    const mockTodos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: true },
      { id: 3, text: 'Todo 3', completed: true }
    ];
    
    mockTodoService.getTodos.mockResolvedValue(mockTodos);
    
    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText('Total: 3 | Completed: 2')).toBeInTheDocument();
    });
  });
});

