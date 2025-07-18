import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from '../components/TodoForm';

describe('TodoForm Component', () => {
  test('renders input and button', () => {
    const mockOnSubmit = jest.fn();
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByPlaceholderText('Enter a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('calls onSubmit with todo text', () => {
    const mockOnSubmit = jest.fn();
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('Test todo');
  });

  test('clears input after submission', () => {
    const mockOnSubmit = jest.fn();
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });

  test('does not submit empty todo', () => {
    const mockOnSubmit = jest.fn();
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const button = screen.getByText('Add Todo');
    fireEvent.click(button);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('trims whitespace from input', () => {
    const mockOnSubmit = jest.fn();
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: '  Test todo  ' } });
    fireEvent.click(button);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('Test todo');
  });
});

