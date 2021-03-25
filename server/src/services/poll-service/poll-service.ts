import Poll from 'models/poll';
import { DatabaseError } from 'services/error-handler';
import { PollModel } from 'models/poll';

export const createPoll = async (payload:PollModel) => {
  try {
    return await Poll.create(payload);
  } catch (error) {
    throw new DatabaseError('Error creating poll');
  }
}

export const findPollBySlug = async (slug:string) => {
  try {
    return await Poll.findOne({ slug });
  } catch (error) {
    throw new DatabaseError('Error fetching poll');
  }
}
