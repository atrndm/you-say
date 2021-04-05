import { Router } from 'express';
import { createAnswer, findAnswerById, updateAnswer, deleteAnswer } from './answers.conteroller';

const answersRouter = Router();

answersRouter
  .post('/', createAnswer)
  .get('/:answerId', findAnswerById)
  .post('/:answerId', updateAnswer)
  .delete('/:answerId', deleteAnswer);

  export default answersRouter;
