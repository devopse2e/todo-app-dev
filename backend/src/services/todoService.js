const todoModel = require('../models/todoModel');

const getAllTodos = async () => {
  return todoModel.getAll();
};

const createTodo = async (text) => {
  return todoModel.create(text);
};

const updateTodo = async (id, updates) => {
  return todoModel.update(id, updates);
};

const deleteTodo = async (id) => {
  return todoModel.delete(id);
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};

