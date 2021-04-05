import { Document, Model } from 'mongoose';
import { IQuestionDocument } from 'models/question';

export interface IAnswer {
  title: string,
  question: IQuestionDocument['_id'] | IQuestionDocument,
}

interface IAnswerBaseDocument extends IAnswer, Document {

}
export interface IAnswerDocument extends IAnswerBaseDocument {
  question: IQuestionDocument['_id'],
}

export interface IAnswerPopulatedDocument extends IAnswerBaseDocument {
  question: IQuestionDocument,
}

export interface IAnswerModel extends Model<IAnswerDocument> {

}
