const request = require('supertest');
const express = require('express');
const cors = require('cors');
const todoRoutes = require('../routes/todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

describe('Todo Routes Integration Tests', () => {
  test('GET /api/todos should work', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/todos should validate input', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ text: 'A'.repeat(101) }); // Too long

    expect(response.status).toBe(400);
  });

  test('Full CRUD flow should work', async () => {
    // Create
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ text: 'Integration test todo' });
    expect(createResponse.status).toBe(201);

    const todoId = createResponse.body.id;

    // Read
    const getResponse = await request(app).get('/api/todos');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveLength(1);

    // Update
    const updateResponse = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ text: 'Updated integration test todo', completed: true });
    expect(updateResponse.status).toBe(200);

    // Delete
    const deleteResponse = await request(app)
      .delete(`/api/todos/${todoId}`);
    expect(deleteResponse.status).toBe(204);

    // Verify deleted
    const finalGetResponse = await request(app).get('/api/todos');
    expect(finalGetResponse.body).toHaveLength(0);
  });
});

