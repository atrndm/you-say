/**
 * DAL for the Poll Entity
 */
import Poll, { IPollDocument } from 'models/poll';
import { DatabaseError } from 'services/error-handler';
import { QuestionModel } from 'src/db/models/question';
import { PollFindQueryDB, PollFindQuery } from './poll-service.types';

const transformFilter = (filter:PollFindQuery):PollFindQueryDB => {
  const dupFilter:PollFindQuery = { ...filter };
  const dbFilter:PollFindQueryDB = {};

  if (dupFilter.id) {
    dbFilter._id = dupFilter.id;
    delete dupFilter.id;
  }

  return {
    ...dupFilter,
    ...dbFilter,
  };
}

export const findPolls = async (filter:PollFindQuery) => {
  try {
    const polls = await Poll
                          .find(transformFilter(filter))
                          .populate('questions')
                          .populate('questions.answers')
                          .exec();
    return polls.map(poll => poll.toJSON());
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching poll' , { filter });
  }
}

export const findPoll = async (filter:PollFindQuery) => {
  try {
    const poll = await Poll
                          .findOne(transformFilter(filter))
                          .populate('questions')
                          .populate('questions.answers');
    return poll;
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching poll' , { filter });
  }
}

export const createPoll = async (payload:IPollDocument) => {
  const { title, status, slug } = payload;
  delete payload.questions;

  try {
    const poll = await Poll.create({ title, status, slug });
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

export const addQuestions = async (id:string, questions:QuestionModel['_id'][]) => {
  try {
    const poll = await Poll.addQuestions(id, questions);
    return poll.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error adding questions to a poll' , { pollId: id, questions });
  }
}
