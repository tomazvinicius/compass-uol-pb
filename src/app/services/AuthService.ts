import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { IAuth, IAuthResponse } from '../interfaces/IAuth';
import TutorRepository from '../repositories/TutorRepository';
import BadRequestError from '../errors/BadRequestError';
import authConfig from '../config/auth';

class AuthService {
  async create(payload: IAuth): Promise<IAuthResponse> {
    const tutor = await TutorRepository.getByEmailToAuth(payload.email);
    if (tutor === null)
      throw new BadRequestError('Incorrect email or password, try again!');

    const verifyAuth = await bcrypt.compare(payload.password, tutor.password);
    if (!verifyAuth)
      throw new BadRequestError('Incorrect email or password, try again!');

    const auth = jwt.sign(
      { id: tutor._id, email: payload.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    const result = { access_token: auth };
    return result;
  }
}

export default new AuthService();
