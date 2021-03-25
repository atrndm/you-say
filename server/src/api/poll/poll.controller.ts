import { Request, Response, NextFunction } from 'express';
import pollService from 'services/poll-service';

export const createPoll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { body } = req;
    const poll = await pollService.createPoll(body);
    res.send(poll);
  } catch (error) {
    next(error);
  }
}

export const findPollBySlug = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { pollSlug } = req.params;
    const poll = await pollService.findPollBySlug(pollSlug);
    res.send(poll);
  } catch (error) {
    next(error);
  }
}
