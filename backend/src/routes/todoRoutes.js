const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo, validateTodoUpdate } = require('../middleware/validation');

// GET /api/todos
router.get('/', todoController.getAllTodos);

// POST /api/todos
router.post('/', validateTodo, todoController.createTodo);

// PUT /api/todos/:id
router.put('/:id', validateTodo, todoController.updateTodo);

router.put('/:id', validateTodoUpdate, todoController.updateTodo);

// DELETE /api/todos/:id
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

