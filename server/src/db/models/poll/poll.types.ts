import { Document, Model, Types } from "mongoose"
import { IQuestion, IQuestionDocument } from 'models/question';

export enum PollStatus {
  draft,
  active,
  completed,
}

export interface IPoll {
  title: string,
  status: PollStatus,
  slug: string,
  questions: Types.ObjectId[] | IQuestionDocument[],
}

interface IPollBaseDocument extends IPoll, Document {
  addQuestions(questions:IQuestion[]): IPollModel,
}

export interface IPollDocument extends IPollBaseDocument {
  questions: IQuestionDocument["_id"][];
}

export interface IPollPopulatedDocument extends IPollBaseDocument {
  questions: IQuestionDocument[];
}

export interface IPollModel extends Model<IPollDocument> {
  addQuestions(id: string, questions: string[]): Promise<IPollDocument>
}
