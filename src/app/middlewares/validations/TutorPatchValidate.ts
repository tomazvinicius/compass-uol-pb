import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const Tutorschema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      phone: Joi.string().min(7).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .exist()
        .optional(),
      password: Joi.forbidden(),
      date_of_birth: Joi.date().optional(),
      zip_code: Joi.string().min(7).optional(),
      pets: Joi.forbidden(),
    });

    const { error } = Tutorschema.validate(req.body, {
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
