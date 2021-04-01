/**
 * DAL for the Poll Entity
 */
import Poll, { PollModel } from 'models/poll';
import { DatabaseError } from 'services/error-handler';
import { createQuestions } from 'services/question-service';
import { PollFindQuery } from './poll-service.types';

export const createPoll = async (payload:PollModel) => {
  const { title, status, slug, questions } = payload;
  delete payload.questions;

  try {
    const poll = await Poll.create({ title, status, slug });

    if (questions) {
      const questionsPayload = questions.map(question => ({...question, poll: poll._id}));
      const questionsRes = await createQuestions(questionsPayload);
      poll.questions = questionsRes;
      poll.populate('questions', 'questions.answers');
      await poll.save();
    }

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
