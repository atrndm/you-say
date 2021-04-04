import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound } from 'services/error-handler';
import pollService from 'services/poll-service';

export const findPolls = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const filter = req.body;
    const polls = await pollService.findPolls(filter);
    res.send(polls);
  } catch (error) {
    next(error);
  }
}

export const findPollBySlug = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const filter = { slug: req.params.pollSlug };
    const poll = await pollService.findPoll(filter);
    if (!poll) {
      throw new ErrorNotFound('Poll not found', filter);
    }
    res.send(poll);
  } catch (error) {
    next(error);
  }
}

export const createPoll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { body } = req;
    const poll = await pollService.createPoll(body);
    res.status(201).send(poll);
  } catch (error) {
    next(error);
  }
}

export const updatePoll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const filter = { id: req.params.pollId }
    const { body } = req;
    const updatedPoll = await pollService.updatePoll(filter, body);

    if (!updatedPoll) {
      throw new ErrorNotFound('Poll not found', filter);
    }

    res.status(200).send(updatedPoll);
  } catch (error) {
    next(error);
  }
}

export const deletePoll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { pollId } = req.params;
    const poll = await pollService.deletePoll(pollId);
    if (!poll) {
      throw new ErrorNotFound('Could not delete poll', { id: pollId });
    }
    res.send(poll);
  } catch (error) {
    next(error);
  }
}