import { Request, Response, NextFunction } from 'express';
import logger from 'services/logger';
import { BaseError } from 'services/errors';
// import { VError } from 'verror';


const errorHandlerMiddleware = (error:BaseError, req:Request, res:Response, next:NextFunction) => {
  const { statusCode, message } = error;

  logger.error(error.message);

  res.status(statusCode).send({
    message,
  })
}

export default errorHandlerMiddleware;