// import axios from 'axios';
import { IProfile, IPoll } from 'src/@types';

async function slowly<T>(payload:T, seconds = 1):Promise<T> {
  return new Promise((res) => {
    setTimeout(() => {
      res(payload);
    }, seconds * 1000);
  });
}

export const getUserProfile = async ():Promise<IProfile> => {
  return slowly({
    id: Math.random().toString(),
    firstName: "Liron",
  });
}

export const getPollsForUser = async (userId:string):Promise<IPoll[]> => {
  return slowly([{
    id: '123',
    title: 'the first poll',
    slug: 'the-first-poll',
    questions: [],
  }, {
    id: '456',
    title: 'the second poll',
    slug: 'the-second-poll',
    questions: [],
  }]);
}

export const getPollBySlug = async (slug:string):Promise<IPoll> => {
  return slowly({
    id: '123',
    title: `the first poll ${Math.random()}`,
    slug: 'the-first-poll',
    questions: [{
      id: 'question-1',
      title: 'the first question',
      answers: [{
        id: 'answer-1',
        title: 'Answer 1',
      }, {
        id: 'answer-2',
        title: 'Answer 2',
      }, {
        id: 'answer-3',
        title: 'Answer 3',
      }]
    }, {
      id: 'question-2',
      title: 'the second question',
      answers: [{
        id: 'answer-1',
        title: 'Answer 1',
      }, {
        id: 'answer-2',
        title: 'Answer 2',
      }, {
        id: 'answer-3',
        title: 'Answer 3',
      }]
    }],
  });
}
