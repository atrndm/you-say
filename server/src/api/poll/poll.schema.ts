import Joi from 'joi';
import { PollStatus } from 'services/poll-service';

export const findPollsSchema = {
  body: Joi.object().keys({
    title: Joi.string().length(3).max(500),
    status: Joi.string().valid(...Object.values(PollStatus)),
    slug: Joi.string().min(5).max(10).required(),
  })
};
