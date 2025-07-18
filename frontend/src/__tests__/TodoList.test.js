import React from 'react';
import { render, screen, act } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Mock the custom hook completely
jest.mock('../hooks/useTodos', () => ({
  useTodos: jest.fn()
}));

// Import the mocked hook
import { useTodos } from '../hooks/useTodos';

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders active and completed sections', async () => {
    useTodos.mockReturnValue({
      todos: [
        { id: 1, text: 'Task A', completed: false },
        { id: 2, text: 'Task B', completed: true }
      ],
      loading: false,
      error: null,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      refetchTodos: jest.fn()
    });

    await act(async () => {
      render(<TodoList />);
    });

    expect(screen.getByText(/active \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText(/completed \(1\)/i)).toBeInTheDocument();
  });

  test('renders correct statistics', async () => {
    useTodos.mockReturnValue({
      todos: [
        { id: 1, text: 'Task A', completed: false },
        { id: 2, text: 'Task B', completed: true }
      ],
      loading: false,
      error: null,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      refetchTodos: jest.fn()
    });

    await act(async () => {
      render(<TodoList />);
    });

    // Check for the actual format your component renders
    expect(screen.getByText('2')).toBeInTheDocument(); // Total count
    expect(screen.getByText('Total')).toBeInTheDocument(); // Total label
    expect(screen.getByText('1')).toBeInTheDocument(); // Active count
    expect(screen.getByText('Active')).toBeInTheDocument(); // Active label
    expect(screen.getByText('Completed')).toBeInTheDocument(); // Completed label
  });

  test('shows empty state when no todos', async () => {
    useTodos.mockReturnValue({
      todos: [],
      loading: false,
      error: null,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      refetchTodos: jest.fn()
    });

    await act(async () => {
      render(<TodoList />);
    });

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

