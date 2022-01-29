import { collection, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Message from '../../fragments/Message';
import { db } from '../../services/firebase';

type Props = {
    messages: {
        id: string,
        message: string,
        user: string,
        timestamp: number
    }[],
    id: string,
}
const ChatMessagesScreen = ({messages, id}: Props) => {
    const messageRef = collection(db, `chats/${id}/messages`)
    const messagesQuery = query(messageRef, orderBy("timestamp", "asc")); //QUERY
    const [messagesSnapshot] = useCollection(messagesQuery)
    function showMessages() {
        if (messagesSnapshot) {
            return (
                messagesSnapshot?.docs?.map(message => (
                    <Message 
                    key={message.id}
                    user={message?.data().user}
                    message={{...message.data()}}
                    />
                ))
            )
        }
    }
    const endOfMessage = React.useRef<HTMLDivElement>(null)
    const currentRef = endOfMessage.current
    React.useEffect(() => {
        if(currentRef) {
            currentRef.scrollIntoView()
        }
    }, [currentRef])

  return (
        <Container>
            {showMessages()}
            <div ref={endOfMessage} style={{paddingBottom: '55px'}}></div>
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    padding: 10px;
    min-height: 75vh;
    background-color: #e5ded8
`

export default ChatMessagesScreen;
