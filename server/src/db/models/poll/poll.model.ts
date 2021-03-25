import mongoose from 'mongoose';
import { PollStatus } from './poll.types';

const PollSchema = new mongoose.Schema(
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
	},
	{ collection: 'polls' }
);

const PollModel = mongoose.model('Poll', PollSchema);
export default PollModel;
