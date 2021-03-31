import { Document } from 'mongoose';
import { PollModel } from '../poll';

export interface QuestionModel extends Document {
  title: string,
  poll: PollModel['_id'],
}
