const request = require('supertest');
const app = require('../src/app');

describe('Group Routes', () => {
  let authToken;

  beforeAll(async () => {
    // Register and login to get token
    const registerRes = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'group@example.com',
      password: 'password123',
    });
    authToken = registerRes.body.token;
  });

  describe('POST /api/groups', () => {
    it('should create a new group', async () => {
      const res = await request(app)
        .post('/api/groups')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Group',
          description: 'A test group',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('data');
    });
  });

  // Add more tests as needed
});

