import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

const baseTodo = { id: 1, text: 'Write tests', completed: false };

describe('TodoItem', () => {
  test('displays todo text', () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    expect(screen.getByText(/write tests/i)).toBeInTheDocument();
  });

  test('toggle button calls onToggle', () => {
    const mockToggle = jest.fn();
    render(
      <TodoItem
        todo={baseTodo}
        onToggle={mockToggle}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /○/i }));
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  test('delete button calls onDelete', () => {
    const mockDelete = jest.fn();
    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onDelete={mockDelete}
        onEdit={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /🗑️/i }));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});

