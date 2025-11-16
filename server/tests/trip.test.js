const request = require('supertest');
const app = require('../src/app');

describe('Trip Routes', () => {
  let authToken;

  beforeAll(async () => {
    // Register and login to get token
    const registerRes = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'trip@example.com',
      password: 'password123',
    });
    authToken = registerRes.body.token;
  });

  describe('POST /api/trips', () => {
    it('should create a new trip', async () => {
      const res = await request(app)
        .post('/api/trips')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          destination: 'Paris',
          startDate: '2024-06-01',
          endDate: '2024-06-07',
          budget: 2000,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('data');
    });
  });

  // Add more tests as needed
});

