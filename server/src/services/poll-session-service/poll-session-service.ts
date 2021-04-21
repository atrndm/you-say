import http from 'http';
import { Server } from 'socket.io';
import logger from 'services/logger';
import { set } from 'lodash';
import pollService from 'services/poll-service';
import answerService from 'services/answer-service';
interface IPollSession {
  [key:string]: {
    [key:string]: Set<string>,
  }
}
const polls:IPollSession = {
  '123': {},
  '456': {},
};

export const createSession = (app:http.RequestListener) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket:any) => {
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

    socket.on('poll:join', async ({ userId, pollId }:{ userId:string, pollId:string }) => {
      logger.debug(`poll-join user ${userId} joined poll ${pollId}`);
      socket.join(pollId);
    });

    socket.on('poll:answer', ({ userId, pollId, questionId, answerId }:{ userId:string, pollId:string, questionId:string, answerId:string }) => {
      logger.debug(`poll-answer: user ${userId} selected answer ${answerId}`);
      if(!polls[pollId][answerId]) {
        set(polls, `${pollId}.${answerId}`, new Set());
      }
      polls[pollId][answerId].add(userId);
      socket.broadcast.to(pollId).emit('poll:answerSelected', { answerId, userId });
    });

    socket.on('poll:leave', ({ userId, pollId }:{ userId:string, pollId:string }) => {
      logger.debug(`poll:leave user ${userId} left poll ${pollId}`);
      socket.leave(pollId);
    });

    socket.on('disconnect', () => {
      logger.debug('user disconnected');
    });
  });

  return server;
}
