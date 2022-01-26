import Head from 'next/head';
import React from 'react';
import ChatHeader from '../../components/ChatHeader';
import { ChatScreen, Container, SendMessageArea } from './style';

const Chat = () => {
  return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <ChatHeader />
            <ChatScreen>
                
            </ChatScreen>
            <SendMessageArea>

            </SendMessageArea>
        </Container>
    );     
};

export default Chat;
