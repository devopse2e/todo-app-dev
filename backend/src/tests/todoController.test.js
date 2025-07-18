const request = require('supertest');
const app = require('../../server');

describe('Todo API', () => {
  test('GET /api/todos should return empty array initially', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/todos should create a new todo', async () => {
    const newTodo = { text: 'Test todo' };
    const response = await request(app)
      .post('/api/todos')
      .send(newTodo);
    
    expect(response.status).toBe(201);
    expect(response.body.text).toBe('Test todo');
    expect(response.body.completed).toBe(false);
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});

