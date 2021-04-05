import 'module-alias/register';
import path from 'path';
import * as dotenv from 'dotenv';
const dotEnvPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: dotEnvPath});

import express from 'express';
import logger, { requestLoggerMiddleware } from 'services/logger';
import { errorHandlerMiddleware } from 'services/error-handler';
import swaggerUIMiddleware from 'middleware/swagger-ui';
import { connectToDatabase } from 'src/db/connect-db';
import { pollsRouter } from 'api/poll';
import { questionsRouter } from 'api/questions';
import { answersRouter } from 'api/answers';

connectToDatabase();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(requestLoggerMiddleware);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/polls', pollsRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

app.use('/api-docs', ...swaggerUIMiddleware());
app.use(errorHandlerMiddleware);

app.listen( port, () => {
  logger.info( `server started at http://localhost:${port}` );
});
