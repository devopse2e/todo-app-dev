process.env.PORT = 3002;
const request = require('supertest');
const express = require('express');
const todoRoutes = require('../routes/todoRoutes');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

describe('Todo Controller Tests', () => {
  beforeEach(() => {
    // Clear todos before each test
    const todoModel = require('../models/todoModel');
    todoModel.clear && todoModel.clear();
  });

  describe('GET /api/todos', () => {
    test('should return empty array initially', async () => {
      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return all todos', async () => {
      // Add a todo first
      await request(app)
        .post('/api/todos')
        .send({ text: 'Test todo' });

      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].text).toBe('Test todo');
    });
  });

  describe('POST /api/todos', () => {
    test('should create a new todo', async () => {
      const newTodo = { text: 'Test todo' };
      const response = await request(app)
        .post('/api/todos')
        .send(newTodo);

      expect(response.status).toBe(201);
      expect(response.body.text).toBe('Test todo');
      expect(response.body.completed).toBe(false);
      expect(response.body.id).toBeDefined();
    });

    test('should return 400 for invalid todo', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ text: '' });

      expect(response.status).toBe(400);
    });

    test('should return 400 for missing text', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/todos/:id', () => {
    test('should update existing todo', async () => {
      // Create a todo first
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ text: 'Test todo' });

      const todoId = createResponse.body.id;

      const updateResponse = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ text: 'Updated todo', completed: true });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.text).toBe('Updated todo');
      expect(updateResponse.body.completed).toBe(true);
    });

    test('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/api/todos/9999')
        .send({ text: 'Updated todo' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    test('should delete existing todo', async () => {
      // Create a todo first
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ text: 'Test todo' });

      const todoId = createResponse.body.id;

      const deleteResponse = await request(app)
        .delete(`/api/todos/${todoId}`);

      expect(deleteResponse.status).toBe(204);

      // Verify it's deleted
      const getResponse = await request(app).get('/api/todos');
      expect(getResponse.body).toHaveLength(0);
    });

    test('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .delete('/api/todos/9999');

      expect(response.status).toBe(404);
    });
  });
});

