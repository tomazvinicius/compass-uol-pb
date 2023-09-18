import request from 'supertest';

import App from '../../app';
import { sutCreateTutor } from '../integration/Tutor.test';

const app = new App().init();

describe('Integration. Pet Routes', () => {
  const sutCreatePet = {
    name: 'Akamaru',
    species: 'dog',
    carry: 'p',
    weight: 10,
    date_of_birth: '2020-11-14T00:00:00.000Z',
  };
  let token: string;
  let idTutor: string;
  let idPet: string;

  beforeAll(async () => {
    sutCreateTutor.email = 'testetestado3@paidepet.com';
    sutCreateTutor.phone = '6915269812452323';

    const post = await request(app).post('/tutor').send(sutCreateTutor);
    idTutor = post.body._id;

    const auth = await request(app).post('/auth').send({
      email: sutCreateTutor.email,
      password: sutCreateTutor.password,
    });
    token = auth.body.access_token;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/tutor/${idTutor}`)
      .set('Authorization', `Bearer ${token}`);
  });

  describe('Pet POST route', () => {
    test('should return statusCode 400 && pet response with request required', async () => {
      const sut = {};

      const { body, statusCode } = await request(app)
        .post(`/pet/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'species is required',
          'carry is required',
          'weight is required',
          'date_of_birth is required',
        ],
      });
    });
    test('should return statusCode 200 && pet response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .post(`/pet/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(201);
      expect(body).toEqual({ _id: body._id, ...sutCreatePet });

      idPet = body._id;
    });
    test('should return statusCode 404 && Not found error with request incorrect', async () => {
      const { body, statusCode } = await request(app)
        .post(`/pet/INV A L ID TU  O R`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: 'Not Found Error',
        details: 'Id not valid',
      });
    });
  });
  describe('Pet UPDATE route', () => {
    test('should return statusCode 400 && pet response with request required', async () => {
      const sut = {};

      const { body, statusCode } = await request(app)
        .put(`/pet/${idPet}/tutor/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'species is required',
          'carry is required',
          'weight is required',
          'date_of_birth is required',
        ],
      });
    });
    test('should return statusCode 404 && Invalid Id with Invalid params Id', async () => {
      const { body, statusCode } = await request(app)
        .put(`/pet/inva lid ind/tutor/id valid?`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: 'Not Found Error',
        details: 'Id not valid',
      });
    });
    test('should return statusCode 404 && Invalid Tutor with Invalid tutor Id', async () => {
      const { body, statusCode } = await request(app)
        .put(`/pet/${idPet}/tutor/64a32d48df2eaccf95fee709`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: 'Not Found Error',
        details: 'Not found Tutor or Pet not Exist in Tutor',
      });
    });
    test('should return statusCode 200 && tutor update response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .put(`/pet/${idPet}/tutor/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(200);
      expect(body).toEqual(sutCreatePet);
    });
  });
  describe('Pet DELETE route', () => {
    test('should return status code 204', async () => {
      const { body, statusCode } = await request(app)
        .delete(`/pet/${idPet}/tutor/${idTutor}`)
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });
    test('should return status code 404', async () => {
      const petid = '64c555d6bfb93fb1bdc71fdc';
      const tutorid = '64c025e73d7493678bcccc8a';
      const { body, statusCode } = await request(app)
        .delete(`/pet/${petid}/tutor/${tutorid}`)
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(404);
      expect(body).toEqual({
        details: 'Not found Tutor or Pet not Exist in Tutor',
        message: 'Not Found Error',
      });
    });
  });
});
