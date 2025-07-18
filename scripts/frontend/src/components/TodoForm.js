import React, { useState } from 'react';

const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo..."
        className="todo-input"
        maxLength={100}
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;

