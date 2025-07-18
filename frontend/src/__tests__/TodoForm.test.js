import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from '../components/TodoForm';

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows validation error on empty submit', async () => {
    const mockAdd = jest.fn();
    render(<TodoForm onSubmit={mockAdd} loading={false} />);
    
    const submitButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(submitButton);
    
    expect(mockAdd).not.toHaveBeenCalled();
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a todo item/i)).toBeInTheDocument();
    });
  });

  test('calls onSubmit with trimmed text', async () => {
    const mockAdd = jest.fn().mockResolvedValue({});
    render(<TodoForm onSubmit={mockAdd} loading={false} />);
    
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const submitButton = screen.getByRole('button', { name: /add/i });
    
    fireEvent.change(input, { target: { value: '  Learn Jest  ' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith('Learn Jest');
    });
  });

  test('disables button when loading', () => {
    const mockAdd = jest.fn();
    render(<TodoForm onSubmit={mockAdd} loading={true} />);
    
    const submitButton = screen.getByRole('button', { name: /add/i });
    expect(submitButton).toBeDisabled();
  });
});

