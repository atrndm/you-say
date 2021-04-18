import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound } from 'services/errors';
import questionsService from 'services/question-service';

export const findQuestionById = async (req:Request, res:Response, next:NextFunction) => {
  const { questionId } = req.params;
  try {
    const question = await questionsService.findQuestionById(questionId);
    if (!question) {
      throw new ErrorNotFound('Question not found', { id: questionId });
    }
    res.send(question);
  } catch (error) {
    next(error);
  }
}

export const createQuestion = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { body } = req;
    const question = await questionsService.createQuestion(body);
    res.status(201).send(question);
  } catch (error) {
    next(error);
  }
}

export const updateQuestion = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const filter = { id: req.params.questionId }
    const { body } = req;
    const updatedQuestion = await questionsService.updateQuestion(filter, body);

    if (!updatedQuestion) {
      throw new ErrorNotFound('Question not found', filter);
    }

    res.status(200).send(updatedQuestion);
  } catch (error) {
    next(error);
  }
}

export const deleteQuestion = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { questionId } = req.params;
    const question = await questionsService.deleteQuestion(questionId);
    if (!question) {
      throw new ErrorNotFound('Could not delete question', { id: questionId });
    }
    res.send(question);
  } catch (error) {
    next(error);
  }
}