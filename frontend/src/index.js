import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('React starting...'); // Debug line
console.log('Root element:', document.getElementById('root')); // Debug line

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React render called'); // Debug line

