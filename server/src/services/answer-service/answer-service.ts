/**
 * DAL for the Anwer Entity
 */
 import Answer, { IAnswerDocument } from 'models/answer';
 import { DatabaseError } from 'services/error-handler';

 export const createAnswer = async (payload:IAnswerDocument) => {
  try {
    return await Answer.create(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating answer');
  }
}

export const createAnswers = async (payload:IAnswerDocument[]) => {
  try {
    return await Answer.insertMany(payload);
  } catch (error) {
    throw new DatabaseError(error, 'Error creating answer');
  }
}
