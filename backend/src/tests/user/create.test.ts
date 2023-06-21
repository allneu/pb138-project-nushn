// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import express from 'express';
import create from '../../routes/user';

const app = express(); // Opravte cestu k souboru create
app.use(express.json());
app.post('/user', create);

describe('POST /user', () => {
  it('should respond with 201 for valid input', async () => {
    const newUser = {
      username: 'TestUser',
      email: 'testuser@example.com',
      password: 'Password123',
    };

    const response = await request(app)
      .post('/user')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('email', newUser.email);
  });

  it('should respond with 400 for invalid input', async () => {
    const newUser = {
      username: 'tu',
      email: 'invalid_email',
      password: '123',
    };

    await request(app)
      .post('/user')
      .send(newUser)
      .expect(400);
  });

  // Další testy pro ošetření chybových stavů, např. uživatel již existuje, server chyba atd...
});
