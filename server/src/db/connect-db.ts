import mongoose from 'mongoose';
import { connectionString } from './config';
import logger from 'services/logger';
import { isProduction } from 'src/config';

import './models/poll';
import './models/question';
import './models/answer';

export const connectToDatabase = () => {
  mongoose.set('debug', (coll:any, method:any, query:any, doc:any, options:any) => {
    const set = {
        coll,
        method,
        query,
        doc,
        options
    };

    logger.database({
        dbQuery: set
    });
  });

  mongoose.connect(connectionString, {
    // for more details, see https://mongoosejs.com/docs/deprecations.html
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: !isProduction,
  });

}
