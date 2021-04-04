import mongoose from 'mongoose';
import CustomSchema from '../../custom-schema';
import { PollStatus, PollModel } from './poll.types';

const PollSchema = new CustomSchema(
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
      type: CustomSchema.Types.ObjectId,
      ref: 'Question',
    }]
	}, {
    collection: 'polls',
    timestamps: true,
  }
);

const PollModel = mongoose.model<PollModel>('Poll', PollSchema);
export default PollModel;
