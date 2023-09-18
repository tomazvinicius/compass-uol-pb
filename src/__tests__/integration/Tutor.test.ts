import request from 'supertest';

import App from '../../app';

const app = new App().init();
export const sutCreateTutor = {
  name: 'Teste Testado',
  password: '1234',
  phone: '6915251812452323',
  email: 'testetestado@paidepet.com',
  date_of_birth: '2002-01-26T00:00:00.000Z',
  zip_code: '61760000',
};

describe('Integration. Tutor Routes', () => {
  const objs = {
    idTutor: '',
    token: '',
  };
  describe('Tutor POST route', () => {
    test('should return statusCode 400 && tutors response with request required', async () => {
      const sut = {};

      const { body, statusCode } = await request(app).post('/tutor').send(sut);
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'phone is required',
          'email is required',
          'password is required',
          'date_of_birth is required',
          'zip_code is required',
        ],
      });
    });
    test('should return statusCode 201 && tutors response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .post('/tutor')
        .send(sutCreateTutor);

      const { password, ...bodyExpect } = sutCreateTutor;

      expect(statusCode).toBe(201);
      expect(body).toEqual({ _id: body._id, ...bodyExpect });

      objs.idTutor = body._id;
    });
    test('should return statusCode 400 && tutors response with tutor already exists', async () => {
      const { body, statusCode } = await request(app)
        .post('/tutor')
        .send(sutCreateTutor);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'DuplicateFieldError',
        details: expect.arrayContaining([
          'phone must be unique',
          'email must be unique',
        ]),
      });
    });
  });
  describe('Auth AUTH route', () => {
    test('should return statusCode 400 && Bad Request Error with request incorrect', async () => {
      const sut = { email: 'NÃOEXISTE@paidepet.com', password: 'NÃOEXISTE' };

      const { body, statusCode } = await request(app).post('/auth').send(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'Bad Request Error',
        details: 'Incorrect email or password, try again!',
      });
    });
    test('should return statusCode 200 && token with request correct', async () => {
      const sut = {
        email: sutCreateTutor.email,
        password: sutCreateTutor.password,
      };

      const { body, statusCode } = await request(app).post('/auth').send(sut);
      objs.token = body.access_token;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('access_token');
    });
  });
  describe('Tutor GET route', () => {
    test('should return statusCode 400 && ValidateError response with query incorrect', async () => {
      const sut = { page: 'ValidateError', limit: 'ValidateError' };

      const { body, statusCode } = await request(app)
        .get('/tutors')
        .set('Authorization', `Bearer ${objs.token}`)
        .query(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: ['page must be a number', 'limit must be a number'],
      });
    });
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = { page: 2, limit: 10 };

      const { body, statusCode } = await request(app)
        .get('/tutors')
        .set('Authorization', `Bearer ${objs.token}`)
        .query(sut);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('docs');
    });
  });
  describe('Tutor UPDATE route', () => {
    const { password, ...sutUpdateTutor } = sutCreateTutor;
    test('should return statusCode 400 && ValidateError with request incomplete', async () => {
      const sut = {};

      const { body, statusCode } = await request(app)
        .put(`/tutor/${objs.idTutor}`)
        .set('Authorization', `Bearer ${objs.token}`)
        .send(sut);
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'phone is required',
          'email is required',
          'date_of_birth is required',
          'zip_code is required',
        ],
      });
    });
    test('should return statusCode 404 && Invalid Id with Invalid params Id', async () => {
      const { body, statusCode } = await request(app)
        .put(`/tutor/INVALIDID`)
        .set('Authorization', `Bearer ${objs.token}`)
        .send(sutUpdateTutor);

      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: 'Not Found Error',
        details: 'Id not valid',
      });
    });
    test('should return statusCode 404 && Invalid Tutor with Invalid tutor Id', async () => {
      const email = 'testetestado2@paidepet.com';
      const phone = '69152518512332';
      const { body, statusCode } = await request(app)
        .put(`/tutor/64c424c75ffde056dbe31234`)
        .set('Authorization', `Bearer ${objs.token}`)
        .send({ ...sutUpdateTutor, email, phone });

      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: 'Not Found Error',
        details: 'Tutor not found',
      });
    });
    test('should return statusCode 200 && tutor update response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .put(`/tutor/${objs.idTutor}`)
        .set('Authorization', `Bearer ${objs.token}`)
        .send(sutUpdateTutor);

      expect(statusCode).toBe(200);
      expect(body).toEqual(sutUpdateTutor);
    });
  });
  describe('Tutor DELETE route', () => {
    test('should return status code 204', async () => {
      const { body, statusCode } = await request(app)
        .delete(`/tutor/${objs.idTutor}`)
        .set('Authorization', `Bearer ${objs.token}`);
      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });
    test('should return status code 404', async () => {
      const { body, statusCode } = await request(app)
        .delete(`/tutor/${objs.idTutor}`)
        .set('Authorization', `Bearer ${objs.token}`);
      expect(statusCode).toBe(404);
      expect(body).toEqual({
        details: 'Not Tutor exists',
        message: 'Not Found Error',
      });
    });
  });
});
