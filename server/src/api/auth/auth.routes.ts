import { Router } from 'express';
import { register, login, authenticateToken } from './auth.controller';

const AuthRouter = Router();

AuthRouter
  .post('/register', register)
  .post('/login', login)
  .post('/authenticate', authenticateToken);

  export default AuthRouter;
