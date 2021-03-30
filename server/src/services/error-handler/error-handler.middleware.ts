import { Request, Response, NextFunction } from 'express';
import logger from 'services/logger';
import { CustomError } from './error-handler.errors';
import { isProduction } from 'src/config';
import { VError } from 'verror';


const errorHandlerMiddleware = (error:CustomError, req:Request, res:Response, next:NextFunction) => {
  // tslint:disable
  console.log(error, VError.info(error));
  const { statusCode, message } = error;

  logger.error(error.message);

  res.status(statusCode).send({
    message,
  })
}

export default errorHandlerMiddleware;