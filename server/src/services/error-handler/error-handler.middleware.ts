import { Request, Response, NextFunction } from 'express';
import logger from 'services/logger';
import { CustomError } from './error-handler.errors';
import { isProduction } from 'src/config';

const errorHandlerMiddleware = (error:CustomError, req:Request, res:Response, next:NextFunction) => {
  // tslint:disable
  console.log(error);
  const { statusCode, message } = error;

  logger.error(error.message, error);

  res.status(statusCode).send({
    message,
  })
}

export default errorHandlerMiddleware;