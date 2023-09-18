import type { Request, Response, NextFunction } from 'express';
import jtw from 'jsonwebtoken';

import UnauthorizedError from '../errors/UnauthorizedError';
import authConfig from '../config/auth';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined)
      throw new UnauthorizedError('No token provided');

    const parts = authHeader.split(' ');

    if (!(parts.length === 2))
      throw new UnauthorizedError('Token malformatted');

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedError('Token malformatted');

    jtw.verify(token, authConfig.secret, (err, decoded) => {
      if (!(err === null)) throw new UnauthorizedError('Token Invalid');

      next();
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.name,
      details: error.message,
    });
  }
};
