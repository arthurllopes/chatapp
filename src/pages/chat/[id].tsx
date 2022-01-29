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
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <ChatHeader chatUsers={chat.users} />
            <ChatMessagesScreen messages={messages} id={chat.id} />
            <SendMessageInput />
        </>
    );     
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {

   //getting the chat which id was given
   const chatRef = doc(db, 'chats', `${context.query.id}`) //DOCUMENT REFERENCE
   const chatDoc = await getDoc(chatRef) //DOCUMENT SNAPSHOT

   //getting the messages from the chosen chat
   const messageRef = collection(db, `chats/${context.query.id}/messages`); //COLLECTION REFERENCE

    const messagesQuery = query(messageRef, orderBy("timestamp", "asc")); //QUERY

    const messageDoc = await getDocs(messagesQuery) //QUERYSNAPSHOT

    const messages = messageDoc?.docs?.map(doc => ({id: doc.id, ...doc.data()}))

    //WHENEVER YOU SEND AN TIMESTAMP FROM BACK END TO CLIENT, YOU LOSE YOUR TIMESTAMP
    .map(message => (
        {
            ...message,
            timestamp: message.timestamp.toDate().getTime()
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
            chat,
        }
    }
}
