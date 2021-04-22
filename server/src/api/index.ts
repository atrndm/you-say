import { Router } from 'express';
import tokenAuth from 'middleware/token-auth';
import { pollsRouter } from 'api/poll';
import { questionsRouter } from 'api/questions';
import { answersRouter } from 'api/answers';

export const apiRouter = Router();
apiRouter.use(tokenAuth);
apiRouter.use('/polls', pollsRouter); // move to api/index
apiRouter.use('/questions', questionsRouter); // move to api/index
apiRouter.use('/answers', answersRouter); // move to api/index
