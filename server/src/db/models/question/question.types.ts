import { Document } from 'mongoose';
import { IPollDocument } from '../poll';
import { AnswerModel } from '../answer';

export interface IQuestion {
  title: string,
  poll: IPollDocument['_id'] | string,
  answers: AnswerModel['_id'][],
}
export interface QuestionModel extends Document {
  title: string,
  poll: IPollDocument['_id'] | string,
  answers: AnswerModel['_id'][],
}
