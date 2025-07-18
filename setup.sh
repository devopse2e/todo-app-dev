#!/bin/bash

# Todo App Frontend Setup Script
# Run this script to create all necessary files for the frontend

echo "🚀 Creating Todo App Frontend..."

# Create main frontend directory
mkdir -p frontend
cd frontend

# Create subdirectories
mkdir -p public src/components src/services src/styles

echo "📁 Created directory structure"

# Create package.json
cat > package.json << 'EOF'
{
  "name": "todo-frontend",
  "version": "1.0.0",
  "private": true,
  "description": "Todo App Frontend",
  "main": "src/index.js",
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "jest",
    "test:ci": "jest --coverage --ci --watchAll=false"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.3",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    "style-loader": "^3.3.3",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

# Create webpack.config.js
cat > webpack.config.js << 'EOF'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
EOF

# Create .babelrc
cat > .babelrc << 'EOF'
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
EOF

# Create public/index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Simple Todo App with React and Node.js" />
    <title>Todo App</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
EOF

# Create src/index.js
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create src/App.js
cat > src/App.js << 'EOF'
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
EOF

echo "📄 Created configuration files"

# Create src/components/TodoList.js
cat > src/components/TodoList.js << 'EOF'
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { todoService } from '../services/api';
import '../styles/TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Using offline mode.');
      console.error('Error loading todos:', err);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(text);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo. Working offline.');
      console.error('Error adding todo:', err);
      const localTodo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, localTodo]);
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError(null);
      const todo = todos.find(t => t.id === id);
      const updatedTodo = await todoService.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError('Failed to update todo. Working offline.');
      console.error('Error updating todo:', err);
      setTodos(todos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Working offline.');
      console.error('Error deleting todo:', err);
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  if (loading) return <div className="loading">Loading todos...</div>;

  return (
    <div className="todo-list">
      <TodoForm onSubmit={addTodo} />
      {error && <div className="error">{error}</div>}
      <div className="todos-container">
        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
      <div className="todo-stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoList;
EOF

# Create src/components/TodoForm.js
cat > src/components/TodoForm.js << 'EOF'
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
EOF

# Create src/components/TodoItem.js
cat > src/components/TodoItem.js << 'EOF'
import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        aria-label="Delete todo"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;
EOF

echo "⚛️ Created React components"

# Create src/services/api.js
cat > src/services/api.js << 'EOF'
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const todoService = {
  getTodos: async () => {
    try {
      const response = await api.get('/api/todos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTodo: async (text) => {
    try {
      const response = await api.post('/api/todos', { text });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    try {
      const response = await api.put(`/api/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
    } catch (error) {
      throw error;
    }
  }
};
EOF

echo "🌐 Created API service"

# Create CSS files
cat > src/styles/index.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #333;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  min-height: 100vh;
}
EOF

cat > src/styles/App.css << 'EOF'
.App {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.App-header {
  background-color: #282c34;
  padding: 30px;
  border-radius: 12px;
  color: white;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.App-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.App-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
}

.App-main {
  min-height: 400px;
}

.loading {
  font-size: 1.2rem;
  color: #666;
  padding: 40px;
  text-align: center;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  border: 1px solid #ffcdd2;
  font-size: 0.9rem;
}
EOF

cat > src/styles/TodoList.css << 'EOF'
.todo-list {
  max-width: 600px;
  margin: 0 auto;
}

.todo-form {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  padding: 25px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-input {
  flex: 1;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.todo-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.add-btn {
  padding: 15px 25px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #45a049;
}

.add-btn:active {
  transform: translateY(1px);
}

.todos-container {
  margin-bottom: 25px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: white;
  transition: all 0.3s ease;
}

.todo-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.todo-item.completed {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #4CAF50;
}

.todo-text {
  font-size: 16px;
  text-align: left;
  flex: 1;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background-color: #da190b;
}

.delete-btn:active {
  transform: scale(0.95);
}

.no-todos {
  color: #888;
  font-style: italic;
  padding: 60px 20px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  font-size: 1.1rem;
}

.todo-stats {
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #1976d2;
  font-weight: 600;
  font-size: 1.1rem;
}
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
EOF

echo "🎨 Created CSS styles"

echo ""
echo "✅ Todo App Frontend created successfully!"
echo ""
echo "📁 Project structure:"
echo "frontend/"
echo "├── package.json"
echo "├── webpack.config.js"
echo "├── .babelrc"
echo "├── .gitignore"
echo "├── public/"
echo "│   └── index.html"
echo "└── src/"
echo "    ├── index.js"
echo "    ├── App.js"
echo "    ├── components/"
echo "    │   ├── TodoList.js"
echo "    │   ├── TodoForm.js"
echo "    │   └── TodoItem.js"
echo "    ├── services/"
echo "    │   └── api.js"
echo "    └── styles/"
echo "        ├── index.css"
echo "        ├── App.css"
echo "        └── TodoList.css"
echo ""
echo "🚀 Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Start development server: npm run dev"
echo "3. Open browser at: http://localhost:3000"
echo ""
echo "✨ The app works offline and will gracefully handle backend unavailability!"
