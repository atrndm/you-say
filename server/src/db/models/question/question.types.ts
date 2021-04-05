import { Document, Model } from 'mongoose';
import { IPollDocument } from 'models/poll';
import { IAnswerDocument } from 'models/answer';

export interface IQuestion {
  title: string,
  poll: IPollDocument['_id'] | IPollDocument,
  answers: IAnswerDocument['_id'][] | IAnswerDocument,
}

interface IQuestionBaseDocument extends IQuestion, Document {
  addAnswers(answers:IAnswerDocument[]): IQuestionModel,
}

export interface IQuestionDocument extends IQuestionBaseDocument {
  question: IQuestionDocument['_id'],
  answers: IAnswerDocument['_id'][],
}

export interface IQuestionPopulatedDocument extends IQuestionBaseDocument {
  question: IQuestionDocument,
  answers: IAnswerDocument[],
}

export interface IQuestionModel extends Model<IQuestionDocument> {
  addAnswers(id: string, answers: string[]): Promise<IQuestionDocument>
}
