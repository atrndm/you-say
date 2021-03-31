import mongoose, { Schema } from 'mongoose';
import { AnswerModel } from './answer.types';

const AnswerSchema = new Schema(
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

const AnswerModel = mongoose.model<AnswerModel>('Answer', AnswerSchema);
export default AnswerModel;
