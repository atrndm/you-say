import { Router } from 'express';
import { register, login, authenticateToken } from './auth.controller';

const pollRouter = Router();

pollRouter
  .post('/register', register)
  .post('/login', login)
  .post('/authenticate', authenticateToken);

  export default pollRouter;
