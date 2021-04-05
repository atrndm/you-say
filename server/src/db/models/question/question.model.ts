import mongoose, { Schema, Model } from 'mongoose';
import { IAnswerDocument } from 'models/answer';
import { IQuestionDocument, IQuestionModel } from './question.types';

const QuestionSchema = new Schema<IQuestionDocument>(
	{
    title: {
      type: String,
      required: true
    },
    poll: {
      type: mongoose.Types.ObjectId,
      ref: 'Poll',
      required: true,
    },
    answers: [{
      type: mongoose.Types.ObjectId,
      ref: 'Answer'
    }],
	}, {
    collection: 'questions',
    timestamps: true,
  }
);

QuestionSchema.statics.addAnswers = async function(this: Model<IQuestionDocument>, id: string, answers: IAnswerDocument[]) {
  return this.findByIdAndUpdate(mongoose.Types.ObjectId(id), { $addToSet: { answers }}, { new: true }).populate('answers').exec();
}

const QuestionModel = mongoose.model<IQuestionDocument, IQuestionModel>('Question', QuestionSchema);
export default QuestionModel;
