import mongoose, { Schema, Types, Model } from 'mongoose';
import { PollStatus, IPollModel, IPollDocument } from './poll.types';
import { IQuestionDocument } from 'models/question';

const PollSchema = new Schema<IPollDocument>(
	{
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: PollStatus,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    questions:  [{
      type: Schema.Types.ObjectId,
      ref: 'Question',
    }]
	}, {
    collection: 'polls',
    timestamps: true,
  }
);

PollSchema.statics.addQuestions = async function(this: Model<IPollDocument>, id: string, questions: IQuestionDocument[]) {
  return this.findByIdAndUpdate(Types.ObjectId(id), { $addToSet: { questions }}, { new: true }).populate(questions).exec();
}

const PollModel = mongoose.model<IPollDocument, IPollModel>('Poll', PollSchema);
export default PollModel;
