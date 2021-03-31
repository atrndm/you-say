import mongoose, { Schema } from 'mongoose';
import { QuestionModel } from './question.types';

const QuestionSchema = new Schema(
	{
    title: {
      type: String,
      required: true
    },
    poll: {
      type: Schema.Types.ObjectId,
      ref: 'Poll',
      required: true,
    },
	}, {
    collection: 'questions',
    timestamps: true,
  }
);

const QuestionModel = mongoose.model<QuestionModel>('Question', QuestionSchema);
export default QuestionModel;
