import { Router } from 'express';
import { findPolls, createPoll, findPollBySlug, updatePoll, deletePoll } from './poll.controller';

const pollRouter = Router();

pollRouter
  .post('/', createPoll)
  .post('/search', findPolls)
  .get('/:pollSlug', findPollBySlug)
  .post('/:pollId', updatePoll)
  .delete('/:pollId', deletePoll);

  export default pollRouter;
