import { Router } from 'express';
import { createPoll, findPollBySlug } from './poll.controller';

const pollRouter = Router();

pollRouter
  .post('/', createPoll)
  .get('/:pollSlug', findPollBySlug);

  export default pollRouter;
