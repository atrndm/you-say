/**
 * DAL for the Question Entity
 */
import Question, { QuestionModel } from 'models/question';
import { DatabaseError } from 'services/error-handler';
import { createAnswers } from 'services/answer-service';
import { QuestionFindQuery } from './question-service.types';

export const createQuestion = async (payload:QuestionModel) => {
  const { poll, title, answers } = payload;

  try {
    const question = await Question.create({ title, poll });

    if (answers) {
      const answersPayload = answers.map(answer => ({...answer, question: question._id}));
      const answersRes = await createAnswers(answersPayload);
      question.answers = answersRes;
      question.populate('answers');
      await question.save();
    }

    return await Question.create(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating poll');
  }
}

export const createQuestions = async (payload:QuestionModel[]) => {
  try {
    const promises = payload.map(createQuestion);
    const resolvedPromises = await Promise.all(promises);
    return resolvedPromises;
  } catch (error) {
    throw new DatabaseError(error, 'Error creating poll');
  }
}

export const updateQuestion = async (filter:QuestionFindQuery, payload:QuestionModel) => {
  try {
    return await Question.findOneAndUpdate(filter, payload, {
      new: true
    });
  } catch (error) {
    throw new DatabaseError(error, 'Error updating question', { filter, payload });
  }
}

export const findQuestionById = async (id:string) => {
  try {
    return await Question.findOne({ _id: id }).populate('answers');
  } catch (error) {
    throw new DatabaseError(error, `Error fetching question ${id}` , { filter: { id }});
  }
}
