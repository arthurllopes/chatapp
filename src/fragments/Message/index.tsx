import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../services/firebase';

type Props = {
    user: any,
    message: any
}
const Message = ({user, message}: Props) => {
  const [sending] = useAuthState(auth)

  return (
      <Container>
        <div className={user === sending?.email ? 'message-right' : 'message-left'}>
          <div className="message">
            {message.message}
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
      padding: .75rem 1rem;
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
      padding: .75rem 1rem;
      background-color: #96f196;
    }
  }
`



export default Message;
