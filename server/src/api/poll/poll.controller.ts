import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound } from 'services/error-handler';
import pollService from 'services/poll-service';

export const createPoll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { body } = req;
    const poll = await pollService.createPoll(body);
    res.status(201).send(poll);
  } catch (error) {
    next(error);
  }
}

export const findPollBySlug = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { pollSlug } = req.params;
    const poll = await pollService.findPollBySlug(pollSlug);
    if (!poll) {
      throw new ErrorNotFound('Poll not found', { slug: pollSlug });
    }
    res.send(poll);
  } catch (error) {
    next(error);
  }
}

export const updatePoll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { pollSlug } = req.params;
    const { body } = req;
    const updatedPoll = await pollService.updatePoll({ slug: pollSlug }, body);

    if (!updatedPoll) {
      throw new ErrorNotFound('Poll not found', { slug: pollSlug });
    }

    res.status(200).send(updatedPoll);
  } catch (error) {
    next(error);
  }
}
