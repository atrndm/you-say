import 'module-alias/register';
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)});

import express from 'express';
import logger, { requestLoggerMiddleware } from 'services/logger';

const app = express();
const port = process.env.PORT || 8080;

app.use(requestLoggerMiddleware);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get( '/', ( req, res ) => {
    res.send( 'Hello world!' );
} );

app.listen( port, () => {
  logger.info( `server started at http://localhost:${ port }` );
});
