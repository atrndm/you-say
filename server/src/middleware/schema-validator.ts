import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { InputValidationError } from 'services/errors';

interface MiddlewareSchme {
  body?: Joi.ObjectSchema,
  query?: Joi.ObjectSchema,
}
const schemaValidator = (schema:MiddlewareSchme) => (req:Request, res:Response, next:NextFunction) => {
  const bodyValidationResult = schema.body?.validate(req.body);
  const queryValidationResult = schema.query?.validate(req.query);
  const error = bodyValidationResult.error || queryValidationResult.error;

  if(error) {
    throw new InputValidationError(error.message);
  }

 next();
}

export default schemaValidator;