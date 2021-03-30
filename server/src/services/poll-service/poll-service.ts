import Poll, { PollModel } from 'models/poll';
import { DatabaseError, ErrorNotFound } from 'services/error-handler';
import { PollFindQuery } from './poll-service.types';

export const createPoll = async (payload:PollModel) => {
  try {
    return await Poll.create(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating poll');
  }
}

export const updatePoll = async (filter:PollFindQuery, payload:PollModel) => {
  try {
    return await Poll.findOneAndUpdate(filter, payload, {
      new: true
    });
  } catch (error) {
    throw new DatabaseError(error, 'Error updating poll', { filter, payload });
  }
}

export const findPollBySlug = async (slug:string) => {
  try {
    return await Poll.findOne({ slug });
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching poll' , { filter: { slug }});
  }
}
