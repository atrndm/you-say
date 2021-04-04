import { Document, Model, Types } from "mongoose"
import { QuestionModel } from '../question';

export enum PollStatus {
  draft,
  active,
  completed,
}

export interface IPoll {
  title: string,
  status: PollStatus,
  slug: string,
  questions: Types.ObjectId[] | QuestionModel[],
}

interface IPollBaseDocument extends IPoll, Document {
  title: string,
  status: PollStatus,
  slug: string,
  addQuestions(questions:QuestionModel[]): IPollModel,
}

export interface IPollDocument extends IPollBaseDocument {
  questions: QuestionModel["_id"][];
}

export interface IPollPopulatedDocument extends IPollBaseDocument {
  questions: QuestionModel[];
}

export interface IPollModel extends Model<IPollDocument> {
  addQuestions(id: string, questions: string[]): Promise<IPollDocument>
}
