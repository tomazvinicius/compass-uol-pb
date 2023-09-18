import TutorServiceMock from './TutorService.mock';
import TutorService from '../../app/services/TutorService';
import AuthService from '../../app/services/AuthService';
import TutorRepository from '../../app/repositories/TutorRepository';
import NotFoundError from '../../app/errors/NotFoundError';

describe('Unit. Tutor Service', () => {
  describe('Tutor Service.get', () => {
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const TutorGetRepositoryMock = jest
        .spyOn(TutorRepository, 'get')
        .mockReturnValueOnce(TutorServiceMock.TutorGetRepositoryMock());

      const sut = TutorService.get;
      const query = { page: 1, limit: 10 };

      const actual = await sut(query);

      expect(actual).toEqual(TutorServiceMock.TutorGetRepositoryMock());
      expect(TutorGetRepositoryMock).toHaveBeenCalledWith(
        query.page,
        query.limit
      );
    });
  });
  describe('Tutor Service.post', () => {
    test('should return statusCode 202 && all tutors response with request correct', async () => {
      const postTutor = TutorService.post;

      const body = {
        name: 'Guilherme',
        password: '123123',
        phone: '69981212317',
        email: 'guilherme@email.com',
        date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
        zip_code: '61760000',
      };

      const tutorPostRepositoryMock = jest
        .spyOn(TutorRepository, 'post')
        .mockReturnValue(TutorServiceMock.post());

      const actual = await postTutor(body);

      expect(actual).toEqual(TutorServiceMock.post());
      expect(tutorPostRepositoryMock).toHaveBeenCalledWith(body);
    });
  });
  describe('Tutor Service.auth', () => {
    test('should return statusCode 202 && all tutors response with request correct', async () => {
      const authTutor = AuthService.create;

      const body = {
        email: 'antonio@paidepet.com',
        password: '123456',
      };

      const tutorAuthRepositoryMock = jest
        .spyOn(TutorRepository, 'getByEmailToAuth')
        .mockReturnValue(TutorServiceMock.auth());
      const actual = await authTutor(body);

      expect(actual).toHaveProperty('access_token');
      expect(tutorAuthRepositoryMock).toHaveBeenCalledWith(body.email);
    });
  });
  describe('Tutor Service.put', () => {
    test('should return statusCode 200 && update tutor data and return the updated tutor with request correct', async () => {
      const IdTutor = '64a32d48df2eaccf95fee709';
      const sut = TutorService.update;

      const body = {
        name: 'Geovanna',
        password: '123456',
        phone: '85999323895',
        email: 'geovanna@paidepet.com',
        date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
        zip_code: '61760000',
      };
      const tutorPutRepositoryMock = jest
        .spyOn(TutorRepository, 'update')
        .mockReturnValueOnce(TutorServiceMock.put());

      const actual = await sut(IdTutor, body);

      expect(actual).toEqual(TutorServiceMock.put());
      expect(tutorPutRepositoryMock).toHaveBeenCalledWith(IdTutor, body);
    });
    test('Should return a 404 && NotFoundTutor erros with invalid requests', async () => {
      jest
        .spyOn(TutorRepository, 'update')
        .mockReturnValueOnce(TutorServiceMock.put());
      const sut = TutorService.update;
      const IdTutor = '64c167f9e96b9c0b1ba289d8';

      const body = {
        name: 'Geovanna',
        password: '123456',
        phone: '85999323895',
        email: 'geovanna@paidepet.com',
        date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
        zip_code: '61760000',
      };

      try {
        await sut(IdTutor, body);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.name).toBe('Not Found Error');
        expect(error.message).toBe('Tutor not found');
      }
    });
  });
  describe('Tutor Service.delete', () => {
    test('should return Code 204 status with correct request', async () => {
      jest
        .spyOn(TutorRepository, 'getPetsById')
        .mockReturnValueOnce(TutorServiceMock.getPetsById());
      const TutorDeleteRepositoryMock = jest
        .spyOn(TutorRepository, 'delete')
        .mockReturnValueOnce(TutorServiceMock.delete());
      const sut = TutorService.deleteTutorById;
      const id = '64c424c75ffde056dbe3eb95';

      const actual = await sut(id);
      expect(actual).toEqual(TutorServiceMock.delete());
      expect(TutorDeleteRepositoryMock).toHaveBeenCalledWith(id);
    });
  });
});
