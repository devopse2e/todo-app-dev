let todos = [];
let nextId = 1;

exports.getAll = () => Promise.resolve(todos);

exports.create = (text) => {
  const todo = {
    id: nextId++,
    text,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  todos.push(todo);
  return Promise.resolve(todo);
};

exports.update = (id, updates) => {
  const index = todos.findIndex(t => t.id === Number(id));
  if (index === -1) return Promise.resolve(null);

  todos[index] = { ...todos[index], ...updates, updatedAt: new Date() };
  return Promise.resolve(todos[index]);
};

exports.delete = (id) => {
  const index = todos.findIndex(t => t.id === Number(id));
  if (index === -1) return Promise.resolve(false);

  todos.splice(index, 1);
  return Promise.resolve(true);
};

// Add clear method for testing
exports.clear = () => {
  todos = [];
  nextId = 1;
};

