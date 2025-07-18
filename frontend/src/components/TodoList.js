import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import '../styles/TodoList.css';

function TodoList() {
  const { 
    todos, 
    loading, 
    error, 
    addTodo, 
    toggleTodo, 
    editTodo, 
    deleteTodo,
    refetchTodos 
  } = useTodos();

  // Filter todos
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (loading && todos.length === 0) {
    return <LoadingSpinner message="Loading your todos..." />;
  }

  return (
    <div className="todo-list">
      <TodoForm onSubmit={addTodo} loading={loading} />
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={refetchTodos}
        />
      )}
      
      {todos.length === 0 && !loading && !error && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos yet</h3>
          <p>Add your first todo above to get started!</p>
        </div>
      )}
      
      {activeTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">
            Active ({activeTodos.length})
          </h3>
          <div className="todo-items">
            {activeTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </div>
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">
            Completed ({completedTodos.length})
          </h3>
          <div className="todo-items">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </div>
        </div>
      )}
      
      {todos.length > 0 && (
        <div className="todo-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{todos.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{activeTodos.length}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{completedTodos.length}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;

