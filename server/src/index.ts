import 'module-alias/register';
import path from 'path';
import * as dotenv from 'dotenv';
const dotEnvPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: dotEnvPath});

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger, { requestLoggerMiddleware } from 'services/logger';
import errorHandlerMiddleware from 'middleware/error-handler';
import swaggerUIMiddleware from 'middleware/swagger-ui';
import tokenAuth from 'middleware/token-auth';
import { connectToDatabase } from 'src/db/connect-db';
import { authRouter } from 'api/auth';
import { pollsRouter } from 'api/poll';
import { questionsRouter } from 'api/questions';
import { answersRouter } from 'api/answers';
import websocketService from 'services/websocket-service';
import { listen } from 'services/poll-session-service';

connectToDatabase();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLoggerMiddleware);

app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes that do not require authorization
app.use('/', authRouter);
app.use('/api-docs', ...swaggerUIMiddleware());

// Routes that DO require authorization
app.use(tokenAuth);
app.use('/polls', pollsRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

app.use(errorHandlerMiddleware);

const server = websocketService({ app, logger, listen });

server.listen( port, () => {
  logger.info( `server started at http://localhost:${port}` );
});
