import Head from 'next/head';
import React from 'react';
import { Container } from './style';
import {Button} from '@material-ui/core';
import Image from 'next/image';
import { provider, auth} from '../../services/firebase';
import {signInWithPopup } from "firebase/auth";


type Props = {
    loading: boolean;
}

const LoginPage = ({loading}: Props) => {
    async function signInWithGoogle () {
        const result = await signInWithPopup(auth, provider);
    }
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
            {loading ? ('Loading...') : (
                <Button onClick={signInWithGoogle}>SignIn with Google</Button>
            )}
        </Container>
    )
};

export default LoginPage;
