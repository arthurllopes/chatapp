import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useAuthState} from "react-firebase-hooks/auth"
import {auth, db} from '../services/firebase'
import LoginPage from './login'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const [user, loading] = useAuthState(auth)

  React.useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', `${user.uid}`)
      setDoc(docRef, 
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        {merge: true}
      )
    }
  }, [user])

  if(!user) return <LoginPage loading={loading}/>
  
  return <Component {...pageProps} />
}

export default MyApp
