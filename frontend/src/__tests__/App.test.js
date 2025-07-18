import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App root component', () => {
  test('renders brand header', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /todo app/i })
    ).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    render(<App />);
    expect(
      screen.getByText(/stay organized and productive/i)
    ).toBeInTheDocument();
  });
});

