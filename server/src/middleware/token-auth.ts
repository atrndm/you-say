import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from 'services/token-service';
import logger from 'services/logger';
import { ErrorUnauthorized, RuntimeError } from 'services/errors';

const tokenAuthentication = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers;

    if(!authorization) {
      throw new ErrorUnauthorized('Missing authorization header');
    }

    const jwt = authorization.split(' ')?.[1]; // authorization header format: bearer <token>
    const payload = await verifyJwt(jwt);
    req.userId = payload.sub;
    next();
  } catch (error) {
    logger.error(error);

    if (error.statusCode === 401) {
      throw new ErrorUnauthorized(error.message);
    }

    throw new RuntimeError(error.message);
  }
}
export default tokenAuthentication;