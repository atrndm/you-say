import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound } from 'services/errors';
import answersService from 'services/answer-service';

export const findAnswerById = async (req:Request, res:Response, next:NextFunction) => {
  const { answerId } = req.params;
  try {
    const answer = await answersService.findAnswerById(answerId);
    if (!answer) {
      throw new ErrorNotFound('Answer not found', { id: answerId });
    }
    res.send(answer);
  } catch (error) {
    next(error);
  }
}

export const createAnswer = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { body } = req;
    const answer = await answersService.createAnswer(body);
    res.status(201).send(answer);
  } catch (error) {
    next(error);
  }
}

export const updateAnswer = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const filter = { id: req.params.answerId }
    const { body } = req;
    const updatedAnswer = await answersService.updateAnswer(filter, body);

    if (!updatedAnswer) {
      throw new ErrorNotFound('Answer not found', filter);
    }

    res.status(200).send(updatedAnswer);
  } catch (error) {
    next(error);
  }
}

export const deleteAnswer = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { answerId } = req.params;
    const answer = await answersService.deleteAnswer(answerId);
    if (!answer) {
      throw new ErrorNotFound('Could not delete answer', { id: answerId });
    }
    res.send(answer);
  } catch (error) {
    next(error);
  }
}