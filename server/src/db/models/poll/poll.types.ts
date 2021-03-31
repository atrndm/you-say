import { Document } from 'mongoose';
import { QuestionModel } from '../question';

export enum PollStatus {
  draft,
  active,
  completed,
}

export interface PollModel extends Document {
  title: string,
  status: PollStatus,
  slug: string,
  questions: QuestionModel['_id'][],
}
