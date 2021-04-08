import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound, ErrorUnauthorized, ErrorUnknown, RuntimeError } from 'services/error-handler';
import { generateJwt, verifyJwt } from 'services/token-service';
import { sendLoginLinkEmail } from 'services/email-service';
import { createUser, findUser } from 'services/user-service';

export const register = async (req:Request, res:Response, next:NextFunction) => {
  const { email, firstName, lastName } = req.body;

  try {
    const user = await createUser({ email, firstName, lastName });
    let token;

    try {
      token = await generateJwt({ sub: user.id });
    } catch(err){
      throw new ErrorUnknown(err);
    }

    sendLoginLinkEmail({ email, token });

    res.send({
      msg: 'Email with a login link was sent',
      token,
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body;
  try {
    const user = await findUser({ email });

    if(user) {
      let token;

      try {
        token = await generateJwt({ sub: user.id });
      } catch(err){
        throw new ErrorUnknown(err);
      }

      sendLoginLinkEmail({ email, token });
    }

    res.send({
      msg: `Email with a login link was sent`,
    });
  } catch (error) {
    next(error);
  }
}

export const authenticateToken = async (req:Request, res:Response, next:NextFunction) => {
  const { token } = req.body;
  try {
    let userId;
    const tokenPayload = await verifyJwt(token);
    userId = tokenPayload.sub;

    let user;
    try {
      user = await findUser({ id: userId });
    } catch(err){
      throw err;

      // throw new RuntimeError('Failed to fetch user from the user-service');
    }

    if(!user) {
      throw new ErrorUnauthorized();
    }
    let sessionToken;

    try {
      sessionToken = await generateJwt({ sub: user.id, expireIn: 60 });
    } catch(err){
      throw new ErrorUnknown(err);
    }

    res.send({token});
  } catch (error) {
    next(error);
  }
}
