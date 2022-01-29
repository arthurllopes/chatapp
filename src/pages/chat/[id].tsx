import { ChatScreen, Container, SendMessageArea } from './style';
import Head from 'next/head';
import React from 'react';
import ChatHeader from '../../components/ChatHeader';
import { GetServerSideProps } from 'next'
import { collection, getDoc, query, doc, orderBy, getDocs} from 'firebase/firestore';
import { db } from '../../services/firebase';
import ChatMessagesScreen from '../../components/ChatMessagesScreen';
import SendMessageInput from '../../components/SendMessageInput';

type Props = {
    messages: any,
    chat: {
        id: string,
        users: string[],
    }
}
const Chat = ({messages, chat}: Props) => {
  return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <ChatHeader recipient={chat.users[1]}/>
            <ChatMessagesScreen messages={messages} id={chat.id} />
            <SendMessageInput />
        </Container>
    );     
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {

    /* 
    const userChatRef = query(collection(db, 'chats'), where('users', 'array-contains', user?.email))
    const querySnapShot = await getDocs(userChatRef)
    
    */
    const messageRef = collection(db, `chats/${context.query.id}/messages`); //COLLECTION REFERENCE
    //getting the chat which id was given
    const chatRef = doc(db, 'chats', `${context.query.id}`) //DOCUMENT REFERENCE
    const chatDoc = await getDoc(chatRef) //DOCUMENT SNAPSHOT
    //const chatData = chatDoc?.data() //OBJ WITH DATA 'USERS'

    //getting the messages from the chosen chat
    const messagesRef = collection(chatRef, 'messages') //COLLECTION REFERENCE

    const messagesQuery = query(messageRef, orderBy("timestamp", "asc")); //QUERY

    const messageDoc = await getDocs(messagesQuery) //QUERYSNAPSHOT

    const allMessages = messageDoc?.docs?.map(doc => ({id: doc.id, ...doc.data()}))
    const allMessagesDocs = messageDoc?.docs

    //WHENEVER YOU SEND AN TIMESTAMP FROM BACK END TO CLIENT, YOU LOSE YOUR TIMESTAMP
    const messages = allMessages.map(message => (
        {
            ...message,
            date: message?.timestamp
        }
    ))

    //THE CHAT
    const chat = {
        id: chatDoc.id,
        ...chatDoc.data()
    }
    
    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}
