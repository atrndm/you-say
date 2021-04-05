/**
 * DAL for the Anwer Entity
 */
import Answer, { IAnswerDocument } from 'models/answer';
import { DatabaseError } from 'services/error-handler';
import transformFilter from 'src/db/helpers/transform-filter';
import { IAnswerFindQuery } from './answer-service.types';

export const findAnswerById = async (id:string) => {
  const filter = { id };
  try {
    const answer = await Answer.findOne(transformFilter(filter)).populate('answers');
    return answer.toJSON();
  } catch (error) {
    throw new DatabaseError(error, `Error fetching answer ${id}` , { filter });
  }
}

export const createAnswer = async (payload:IAnswerDocument) => {
  try {
    const answer = await Answer.create(payload);
    return answer.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error creating answer');
  }
}

export const updateAnswer = async (filter:IAnswerFindQuery, payload:IAnswerDocument) => {
  try {
    return await Answer.findOneAndUpdate(transformFilter(filter), payload, {
      new: true
    });
  } catch (error) {
    throw new DatabaseError(error, 'Error updating answer', { filter, payload });
  }
}

export const deleteAnswer = async (id:string) => {
  const filter = { id };
  try {
    const { deletedCount } = await Answer.deleteOne(transformFilter(filter));
    return {
      rowsAffected: deletedCount
    }
  } catch (error) {
    throw new DatabaseError(error, 'Error deleting answer' , { filter });
  }
}
