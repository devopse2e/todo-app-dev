// src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="emoji">📝</span>
              Todo App
            </h1>
            <p className="app-subtitle">
              Stay organized and productive
            </p>
          </div>
        </header>
        
        <main className="app-main">
          <TodoList />
        </main>
        
        <footer className="app-footer">
          <p>Built with React & Node.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

