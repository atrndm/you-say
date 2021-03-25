import 'module-alias/register';
import path from 'path';
import * as dotenv from "dotenv";
const dotEnvPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: dotEnvPath});

import express from 'express';
import logger, { requestLoggerMiddleware } from 'services/logger';
import swaggerUIMiddleware from 'middleware/swagger-ui';
import { pollsRouter } from 'api/poll';
import { errorHandlerMiddleware } from 'services/error-handler';
import { connectToDatabase } from 'src/db/connect-db';

connectToDatabase();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(requestLoggerMiddleware);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/polls', pollsRouter);
app.use('/api-docs', ...swaggerUIMiddleware());
app.use(errorHandlerMiddleware);

app.listen( port, () => {
  logger.info( `server started at http://localhost:${ port }` );
});
