import mongoose from 'mongoose';
import { connectionString } from './config';
import logger from 'services/logger';
import { isProduction } from 'src/config';
import customSchema from './custom-schema';

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
mongoose.plugin(customSchema);

export const connectToDatabase = () => {
  require('./models/poll');
  require('./models/question');
  require('./models/answer');

  mongoose.connect(connectionString, {
    // for more details, see https://mongoosejs.com/docs/deprecations.html
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: !isProduction,
  });
}
