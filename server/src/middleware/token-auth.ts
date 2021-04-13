import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from 'services/token-service';
import logger from 'services/logger';

const tokenAuthentication = async (req:Request, res:Response, next:NextFunction) => {
  const jwt = req.headers.authorization?.split(' ')?.[1];
  try {
    const payload = await verifyJwt(jwt);
    req.userId = payload.sub;
    next();
  } catch (error) {
    if (error.code === 401) {
      res.status(401).send({ msg: error.msg })
    }

    logger.error(error);
    res.status(500).send({ msg: "Failed verifying token" })
  }
}
export default tokenAuthentication;