import Question, { QuestionModel } from 'models/question';
import { DatabaseError, ErrorNotFound } from 'services/error-handler';
import { QuestionFindQuery } from './question-service.types';

export const createQuestion = async (payload:QuestionModel) => {
  try {
    return await Question.create(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating poll');
  }
}

export const createQuestions = async (payload:QuestionModel[]) => {
  try {
    return await Question.insertMany(payload);
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
