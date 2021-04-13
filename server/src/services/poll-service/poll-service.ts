/**
 * DAL for the Poll Entity
 */
import Poll, { IPollDocument } from 'models/poll';
import { DatabaseError } from 'services/error-handler';
import { IQuestionDocument } from 'models/question';
import { PollFindQuery } from './poll-service.types';
import transformFilter from 'src/db/helpers/transform-filter';

export const findPolls = async (filter:PollFindQuery) => {
  try {
    const polls = await Poll.find(transformFilter(filter));
    return polls.map(poll => poll.toJSON());
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching poll' , { filter });
  }
}

export const findPoll = async (filter:PollFindQuery) => {
  try {
    const poll = await Poll
                        .findOne(transformFilter(filter))
                        .populate({
                          path: 'questions',
                          select: ['id', 'title', 'answers'],
                          populate: { path: 'answers', select: ['id', 'title'] }
                        })
                        .populate({ path: 'createdBy', select: ['firstName', 'lastName', 'email'] });
    return poll;
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching poll' , { filter });
  }
}

export const createPoll = async (payload:IPollDocument) => {
  const { title, status, slug, createdBy } = payload;
  delete payload.questions;

  try {
    const poll = await Poll.create({ title, status, slug, createdBy });
    return poll.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error creating poll');
  }
}

export const updatePoll = async (filter:PollFindQuery, payload:IPollDocument) => {
  try {
    const poll = await Poll.findOneAndUpdate(transformFilter(filter), transformFilter(payload), {
      new: true
    });
    return poll.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error updating poll', { filter, payload });
  }
}

export const deletePoll = async (id:string) => {
  const filter = { _id: id };
  try {
    const { deletedCount } = await Poll.deleteOne(filter);
    return {
      rowsAffected: deletedCount
    }
  } catch (error) {
    throw new DatabaseError(error, 'Error deleting poll' , { filter });
  }
}

export const addQuestionsToPoll = async (pollId:string, questions:IQuestionDocument['_id'][]) => {
  try {
    const poll = await Poll.addQuestions(pollId, questions);
    return poll.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error adding questions to a poll' , { pollId, questions });
  }
}
