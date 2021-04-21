import { FunctionComponent, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { io } from 'socket.io-client';
import { IPoll, IQueation, IAnswer } from 'src/@types';
import { getPollBySlug } from 'src/services/api';

const socket = io('http://localhost:8080');

socket.on('poll:answerSelected', ({ userId, answerId }) => {
  console.log('poll:answerSelected', { userId, answerId });
})

const joinPoll = (pollId:string, userId:string) => socket.emit('poll:join', { pollId, userId });
const leavePoll = (pollId:string, userId:string) => socket.emit('poll:leave', { pollId, userId });
const onAnswer = (pollId:string, questionId:string, answerId:string, userId:string) => socket.emit('poll:answer', { pollId, questionId, answerId, userId });

type IParams = {
  slug: string,
};

interface IProps extends RouteComponentProps<IParams> {
  userId?: string,
}

export const PollScreen:FunctionComponent<IProps> = (props) => {
  const [poll, setPoll] = useState<IPoll>();
  const { slug } = props.match.params;
  const { userId } = props;

  const initData = async () => {
    if (userId && poll) {
      joinPoll(poll.id, userId);
    }
    const pollData = await getPollBySlug(slug);
    setPoll(pollData);
  }

  useEffect(() => {
    initData();

    return () => {
      setPoll(undefined);
      poll && userId && leavePoll(poll.id, userId);
    }
  }, [slug, userId]);

  return (
    poll && userId ? (
      <div>
        <h2>{poll?.title}</h2>
        <ul>
          {poll?.questions.map((question:IQueation) => (
            <li key={question.id}>
              <h3>{question.title}</h3>
              <ul>
                {question.answers.map((answer:IAnswer) => (
                  <li key={answer.id}>{answer.title} <button onClick={() => onAnswer(poll.id, question.id, answer.id, userId)}>Select</button></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    ) : <>Loading...</>
  ) 
}

export default withRouter(PollScreen);
