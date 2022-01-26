import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import { auth, db } from '../../services/firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from 'next/router';
import { Container } from './style';

type Props = {
    users: string[],
    id: string
}
const ChatBox = ({users, id} : Props) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const userRef = query(collection(db, 'users'), where('email', '==', users[1]))
    const [recipientSnapShot] = useCollection(userRef)
    const recipient = recipientSnapShot?.docs?.[0]

    const handleEnterChat = () => {
        router.push(`/chat/${id}`)
    }
  return (
        <Container onClick={handleEnterChat} >
            <Avatar src={recipient?.data().photoURL}>{users[1][0].toUpperCase()}</Avatar>
            <p style={{marginLeft: '4px'}}>{users[1]}</p>
        </Container>
    );
};

export default ChatBox;
