import React, { useState } from 'react';
import '../styles/TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!editText.trim()) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await onEdit(todo.id, editText.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Edit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      await onToggle(todo.id);
    } catch (error) {
      console.error('Toggle failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(todo.id);
    } catch (error) {
      console.error('Delete failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${loading ? 'loading' : ''}`}>
      <div className="todo-content">
        <button 
          className="toggle-button"
          onClick={handleToggle}
          disabled={loading}
        >
          {todo.completed ? '✓' : '○'}
        </button>
        
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              onBlur={handleEdit}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleEdit();
                }
              }}
              disabled={loading}
              autoFocus
            />
          </div>
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        <button
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
          disabled={loading}
        >
          ✏️
        </button>
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={loading}
        >
          🗑️
        </button>
      </div>
      
      {loading && <div className="loading-overlay"></div>}
    </div>
  );
}

export default TodoItem;

