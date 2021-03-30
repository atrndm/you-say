import { Router } from 'express';
import { createPoll, findPollBySlug, updatePoll } from './poll.controller';

const pollRouter = Router();

pollRouter
  .post('/', createPoll)
  .get('/:pollSlug', findPollBySlug)
  .post('/:pollSlug', updatePoll);

  export default pollRouter;
