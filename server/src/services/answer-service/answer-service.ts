/**
 * DAL for the Anwer Entity
 */
 import Answer, { AnswerModel } from 'models/answer';
 import { DatabaseError } from 'services/error-handler';

 export const createAnswer = async (payload:AnswerModel) => {
  try {
    return await Answer.create(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating answer');
  }
}

export const createAnswers = async (payload:AnswerModel[]) => {
  try {
    return await Answer.insertMany(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating answer');
  }
}
