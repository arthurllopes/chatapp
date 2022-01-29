import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../services/firebase';
import moment from 'moment'

type Props = {
    user: any,
    message: any
}
const Message = ({user, message}: Props) => {
  const [sending] = useAuthState(auth)
  console.log(message)
  return (
      <Container>
        <div className={user === sending?.email ? 'message-right' : 'message-left'}>
          <div className="message">
            <p className="message-text">
              {message.message}
            </p>
            <TimeStamp>
              <p>
                {moment(message?.timestamp?.toDate()).format('LT')}
              </p>
            </TimeStamp>
          </div>
        </div>
      </Container>
  );
};

const Container = styled.div`

  
  .message-left {
    display: flex;
    justify-content: flex-start;

    .message {
      margin-bottom: 1rem;
      margin-left: 1rem;
      border-radius: 40px 40px 40px 0px;
      background-color: #cbcbfc;
    }
    .message-text {
      display: flex;
      justify-content: flex-end;
      text-align: right;
      padding: .75rem 1rem 0px 2rem;
    }
  }
  .message-right {
    display: flex;
    justify-content: flex-end;

    .message {
      margin-bottom: 1rem;
      margin-right: 1rem;
      width: fit-content;
      border-radius: 40px 40px 0px 40px;
      background-color: #96f196;
    }
    .message-text {
      display: flex;
      justify-content: flex-start;
      text-align: left;
      padding: .75rem 2rem 0px 1rem;
    }
  }
`
const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
  p {
    color: gray;
    font-size: .75rem;
    padding: 8px;
    text-align: right;
  }
`



export default Message;
