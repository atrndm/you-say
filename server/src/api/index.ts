import { Router } from 'express';
import tokenAuth from 'middleware/token-auth';
import { pollsRouter } from 'api/poll';
import { questionsRouter } from 'api/questions';
import { answersRouter } from 'api/answers';

export const apiRouter = Router();
apiRouter.use(tokenAuth);
apiRouter.use('/polls', pollsRouter);
apiRouter.use('/questions', questionsRouter);
apiRouter.use('/answers', answersRouter);
