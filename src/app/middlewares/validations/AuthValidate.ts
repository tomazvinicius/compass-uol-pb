import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email().trim(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!(error === undefined)) throw error;

    next();
  } catch (errors) {
    const errorsDetails: string[] = [];
    for (const error of errors.details) {
      errorsDetails.push(error.message.replace(/\\/g, '').replace(/"/g, ''));
    }
    res.status(400).json({
      message: errors.name,
      details: errorsDetails,
    });
  }
};
