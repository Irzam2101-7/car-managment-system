import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ResponseBuilder } from '../utils/responseBuilder';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return ResponseBuilder.error(res, 400, 'Validation failed', error.details);
    }
    next();
  };
};