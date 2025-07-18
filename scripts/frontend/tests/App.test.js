import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders todo app header', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Todo App/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders todo list component', () => {
  render(<App />);
  const todoInput = screen.getByPlaceholderText(/Enter a new todo/i);
  expect(todoInput).toBeInTheDocument();
});

