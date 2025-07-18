import React from 'react';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 My Todo App</h1>
        <p>A simple todo app built with React & Node.js</p>
      </header>
      <main className="App-main">
        <TodoList />
      </main>
    </div>
  );
}

export default App;

