import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false
  };

  test('renders todo text', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  test('renders checkbox in correct state', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('calls onToggle when checkbox is clicked', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButton = screen.getByLabelText('Delete todo');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('applies completed class for completed todos', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const todoItem = screen.getByText('Test todo').closest('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });
});

