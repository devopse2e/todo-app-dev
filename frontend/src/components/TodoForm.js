import React, { useState } from 'react';
import '../styles/TodoForm.css';

function TodoForm({ onSubmit, loading }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter a todo item');
      return;
    }

    if (text.trim().length > 100) {
      setError('Todo must be less than 100 characters');
      return;
    }

    setError('');
    
    try {
      await onSubmit(text.trim());
      setText('');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <div className="input-wrapper">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError('');
            }}
            placeholder="What needs to be done?"
            className={`todo-input ${error ? 'error' : ''}`}
            disabled={loading}
            maxLength={100}
          />
          <button 
            type="submit" 
            className={`add-button ${loading ? 'loading' : ''}`}
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <span>Add</span>
            )}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="character-count">
          {text.length}/100
        </div>
      </div>
    </form>
  );
}

export default TodoForm;

