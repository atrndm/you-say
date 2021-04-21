import http from 'http';
import logger from 'services/logger';
import { set } from 'lodash';

const stuff: { [key: string]: string; } = {};

interface IPollRepo {
  // pollId
  [key: string]: {
    activeParticipants: {
      // userId
      [key: string]: boolean,
    },
    questions: {
      // questionId
      [key: string]: {
        answers: {
          // answerId
          [key: string]: {
            repliedBy: {
              // userId
              [key: string]: boolean
            }
          }
        }
      }
    }
  },
};

const polls:IPollRepo = {}

interface IUserRepo {
  [key:string]: any,
}
const users:IUserRepo = {}

export const listen = (server:http.Server) => {
  server.on('connection', (socket:any) => {
    /*
    - authenticate the connection
    - register to a poll room

    on poll-answer
    - update poll responses
    - send message to all clients that includes the poll current state and the change.

    on poll-ended
    - send message to all clients that the poll had ended.
    */

    logger.debug('a user connected');

    socket.on('poll-join', ({ userId, pollId }:{ userId:string, pollId:string }) => {
      logger.debug(`poll-join user ${userId} joined poll ${pollId}`);
      users[userId] = socket;
      set(polls, `${pollId}.activeParticipants.${userId}`, 1);
      Object.keys(polls[pollId].activeParticipants).forEach(participantId => {
        users[participantId].send(`new user joined: ${userId}`);
      })
      logger.debug(polls);
    });

    socket.on('poll-answer', ({ userId, pollId, questionId, answerId }:{ userId:string, pollId:string, questionId:string, answerId:string }) => {
      logger.debug(`poll-answer: user ${userId} selected answer ${answerId}`);
      set(polls, `${pollId}.questions.${questionId}.answers.${answerId}.repliedBy.${userId}`, true);
      logger.debug(JSON.stringify(polls, null, 2));
    });

    socket.on('poll-leave', ({ userId, pollId }:{ userId:string, pollId:string }) => {
      logger.debug(`poll-join user ${userId} joined poll ${pollId}`);
      delete polls[pollId]?.activeParticipants?.[userId];
      delete users[userId];
      logger.debug(polls);
    });

    socket.on('disconnect', () => {
      logger.debug('user disconnected');
    });
  });
}

export const addUserToSession = () => {
  logger.info('addUserToSession')
}