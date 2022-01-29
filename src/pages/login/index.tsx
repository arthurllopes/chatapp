import Head from 'next/head';
import React from 'react';
import {Button} from '@material-ui/core';
import Image from 'next/image';
import { provider, auth, signInWithGoogle} from '../../services/firebase';
import {signInWithPopup } from "firebase/auth";
import styled from 'styled-components';

const LoginPage = () => {
    
  return (
        <Container>
            <Head>
                <title>ChatApp</title>
            </Head>
            <Image
            src="https://www.maxpixel.net/static/photo/1x/Message-Talk-Communication-Chat-Icon-Discussion-5355899.png"
            alt="Chat Image"
            width={144}
            height={144}
            />
            <Button onClick={signInWithGoogle}>SignIn with Google</Button>
        </Container>
    )
};
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 100px;
    height: 100vh;
`
export default LoginPage;
