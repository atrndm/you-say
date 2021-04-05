import mongoose, { Schema } from 'mongoose';
import { IAnswerDocument, IAnswerModel } from './answer.types';

const AnswerSchema = new Schema<IAnswerDocument>(
	{
    title: {
      type: String,
      required: true
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
	}, {
    collection: 'answers',
    timestamps: true,
  }
);

const AnswerModel = mongoose.model<IAnswerDocument, IAnswerModel>('Answer', AnswerSchema);
export default AnswerModel;
