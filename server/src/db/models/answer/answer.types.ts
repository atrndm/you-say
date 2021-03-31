import { Document } from 'mongoose';
import { QuestionModel } from '../question';

export interface AnswerModel extends Document {
  title: string,
  question: QuestionModel['_id'],
}
