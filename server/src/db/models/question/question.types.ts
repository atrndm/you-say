import { Document } from 'mongoose';
import { PollModel } from '../poll';
import { AnswerModel } from '../answer';

export interface QuestionModel extends Document {
  title: string,
  poll: PollModel['_id'],
  answers: AnswerModel['_id'][],
}
