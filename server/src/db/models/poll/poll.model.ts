import mongoose, { Schema } from 'mongoose';
import { PollStatus, PollModel } from './poll.types';

const PollSchema = new Schema(
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

const PollModel = mongoose.model<PollModel>('Poll', PollSchema);
export default PollModel;
