/**
 * DAL for the Question Entity
 */
import Question, { IQuestion, IQuestionDocument } from 'models/question';
import { DatabaseError } from 'services/errors';
import transformFilter from 'src/db/helpers/transform-filter';
import pollService from 'services/poll-service';
import { IQuestionFindQuery } from './question-service.types';
import { IAnswerDocument } from 'src/db/models/answer';

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

export const updateQuestion = async (filter:IQuestionFindQuery, payload:IQuestionDocument) => {
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
    throw new DatabaseError(error, 'Error deleting question' , { filter });
  }
}

export const addAnswersToQuestion = async (questionId:string, answers:IAnswerDocument['_id'][]) => {
  try {
    const question = await Question.addAnswers(questionId, answers);
    return question.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error adding questions to a poll' , { questionId, answers });
  }
}
