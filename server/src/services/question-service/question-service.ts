/**
 * DAL for the Question Entity
 */
import Question, { IQuestion, IQuestionDocument } from 'models/question';
import { DatabaseError } from 'services/error-handler';
import transformFilter from 'src/db/helpers/transform-filter';
import pollService from 'services/poll-service';
import { QuestionFindQuery } from './question-service.types';

export const findQuestionById = async (id:string) => {
  try {
    return await Question.findOne({ _id: id }).populate('answers');
  } catch (error) {
    throw new DatabaseError(error, `Error fetching question ${id}` , { filter: { id }});
  }
}

export const createQuestion = async (payload:IQuestion) => {
  const { poll, title } = payload;

  try {
    const question = await Question.create({ title, poll });
    await pollService.addQuestionsToPoll(poll, [ question.id ]);
    return question.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error creating question');
  }
}

export const createQuestions = async (payload:IQuestion[]) => {
  try {
    const promises = payload.map(createQuestion);
    const resolvedPromises = await Promise.all(promises);
    return resolvedPromises;
  } catch (error) {
    throw new DatabaseError(error, 'Error creating question');
  }
}

export const updateQuestion = async (filter:QuestionFindQuery, payload:IQuestionDocument) => {
  try {
    return await Question.findOneAndUpdate(transformFilter(filter), payload, {
      new: true
    });
  } catch (error) {
    throw new DatabaseError(error, 'Error updating question', { filter, payload });
  }
}

export const deleteQuestion = async (id:string) => {
  const filter = { id };
  try {
    const { deletedCount } = await Question.deleteOne(transformFilter(filter));
    return {
      rowsAffected: deletedCount
    }
  } catch (error) {
    throw new DatabaseError(error, 'Error deleting Question' , { filter });
  }
}