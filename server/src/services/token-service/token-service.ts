
import jwt from 'jsonwebtoken';
import { authTokenSecret } from 'src/config';
import { ErrorUnknown, RuntimeError } from 'services/error-handler';
import { TokenExpiredError } from './token-service.types';

export const generateJwt = async ({
  sub,
  expireIn = 10,
  payload,
}: {
  sub: string,
  payload?: object,
  expireIn?: number,
}):Promise<string> => {
  if (!sub) {
    throw new RuntimeError('jwt requires sub to be set');

  }
  const exp = Math.floor(Date.now() / 1000) + (expireIn * 60);
  return new Promise((res, rej) => {
    jwt.sign({
      sub,
      exp,
      payload,
    }, authTokenSecret, (err:Error, token:string) => {
      if(err) {
        return rej(err);
      }
      if(token) {
        return res(token);
      }
      return rej(new ErrorUnknown('Unknown error while generating jwt. No token and no error provided from lib.'));
    });
  });
};

export const verifyJwt = (token:string):Promise<any>  => {
  // todo: promisify and throw errors within the service so that they can be loged as the cause of other errors up the chain.
  return new Promise((res, rej) => {
    jwt.verify(token, authTokenSecret, (err, decoded) => {
      if(err) {
        // todo: create classes for the different errors the library throws and decide which ones will need special handling in the app.
        if(err.name === 'TokenExpiredError') {
          return rej(new TokenExpiredError('Token expired'));
        }
        return rej(new ErrorUnknown(`Error while verifying jwt: ${err.name}: ${err.message}`));
      }
      if(decoded) {
        return res(decoded);
      }
      return rej(new ErrorUnknown("Unknown error while verifying jwt. No decoded value and no error provided from lib."));
    });
  });
};
