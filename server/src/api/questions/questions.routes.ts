import { Router } from 'express';
import { createQuestion, findQuestionById, updateQuestion, deleteQuestion } from './questions.controller';

const questionsRouter = Router();

questionsRouter
  .post('/', createQuestion)
  .get('/:questionId', findQuestionById)
  .post('/:questionId', updateQuestion)
  .delete('/:questionId', deleteQuestion);

  export default questionsRouter;
