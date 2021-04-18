import { Router } from 'express';
import { findPolls, createPoll, findPollBySlug, updatePoll, deletePoll } from './poll.controller';
import schemaValidator from 'middleware/schema-validator';
import { findPollsSchema } from './poll.schema';

const pollRouter = Router();

pollRouter
  .post('/', createPoll)
  .post('/search', schemaValidator(findPollsSchema), findPolls)
  .get('/:pollSlug', findPollBySlug)
  .post('/:pollId', updatePoll)
  .delete('/:pollId', deletePoll);

  export default pollRouter;
