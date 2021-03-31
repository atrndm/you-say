import Poll, { PollModel } from 'models/poll';
import { DatabaseError, ErrorNotFound } from 'services/error-handler';
import { createQuestions } from 'services/question-service';
import { PollFindQuery } from './poll-service.types';

export const createPoll = async (payload:PollModel) => {
  const { title, status, slug, questions } = payload;
  delete payload.questions;

  try {
    const poll = await Poll.create({ title, status, slug });

    if (questions) {
      const test = questions.map(question => ({...question, poll: poll._id}));
      const questionsRes = await createQuestions(test);
      poll.questions = [...poll.questions, ...questionsRes];
      poll.populate('questions');
      await poll.save();
    }

    // const test = await poll.populate('questions');
    return poll.toJSON();
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
    return await Poll.findOne({ slug }).populate('questions');
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching poll' , { filter: { slug }});
  }
}
