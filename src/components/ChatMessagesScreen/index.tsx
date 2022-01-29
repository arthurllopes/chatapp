import { timeStamp } from 'console';
import { collection, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Message from '../../fragments/Message';
import { db } from '../../services/firebase';

type Props = {
    messages: {
        id: string,
        messages: string[]
    }[],
    id: string
}
const ChatMessagesScreen = ({messages, id}: Props) => {
    const messageRef = collection(db, `chats/${id}/messages`)
    const messagesQuery = query(messageRef, orderBy("timestamp", "asc")); //QUERY
    const [messagesSnapshot] = useCollection(messagesQuery)
    
  return (
        <Container>
            {messagesSnapshot?.docs?.map(message => (
                <Message 
                key={message.id}
                user={message?.data().user}
                message={{...message.data()}}
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
    padding: 10px;
    min-height: 78vh;
    background-color: #e5ded8
`

export default ChatMessagesScreen;
