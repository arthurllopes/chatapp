import { InsertEmoticon } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

const SendMessageInput = () => {
    const router = useRouter()
    const [message, setMessage] = React.useState<string>('')
    const [user] = useAuthState(auth)
    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        if(message.trim().length > 0) {
            const adding = await addDoc(collection(db, `chats/${router.query.id}`, 'messages'), {
                message,
                user: user?.email,
                timestamp: serverTimestamp(),
            })
        }

        setMessage('');
    }
  return (
      <Container onSubmit={handleSubmit}>    
        <InsertEmoticon />
        <input type="text" name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
        {message.length > 0 ? (
        <IconButton type="submit" >
            <SendIcon />
        </IconButton>
        ) : (
            <IconButton>
            <MicIcon />
        </IconButton>
        )}
        
      </Container>
  )
};

const Container = styled.form`
    display: flex;
    align-items: center;

    border-top: 1px solid whitesmoke;
    background-color: white;

    position: sticky;
    bottom: 0;
    z-index: 200;
    padding: .75rem 2rem;


    input {
        flex: 1;
        padding: 12px;
        margin: 8px 18px;
        border-radius: 22px;
        border: none;

        background-color: whitesmoke;
    }
`

export default SendMessageInput;
