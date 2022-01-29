import { Avatar, IconButton } from '@material-ui/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { auth, db } from '../../services/firebase';
import { Container } from './style';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import TimeAgo from 'timeago-react'

type Props = {
    chatUsers: string[]
}
const ChatHeader = ({chatUsers}: Props) => {
    const [user] = useAuthState(auth)
    const [recipientObj, setRecipientObj] = React.useState<any>()
    const recipientEmail = chatUsers?.filter(userFiltered => userFiltered !== user?.email)[0]

    React.useEffect(() => {
        const getRecipientDoc = async () => {
            const userRef = query(collection(db, 'users'), where('email', '==', recipientEmail))
            const recipientSnapShot = await getDocs(userRef)
            const recipientDoc = recipientSnapShot.docs?.[0]?.data()
            setRecipientObj(recipientDoc)
        }        
        getRecipientDoc()
    }, [recipientEmail])
    

  return (
        <Container>
                <div className="go-back-button">
                    <Link href='/' passHref>
                        <IconButton>
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Link>
                </div>
                <div className="recipient-area">
                    <Avatar src={recipientObj?.photoURL}>{recipientEmail[0].toUpperCase()}</Avatar>
                    <div className="contact-info">
                        {recipientEmail}
                    <p style={{fontSize: '.85rem'}}>
                        {recipientObj?.lastSeen?.toDate() ? (
                            <>
                                Last active: <TimeAgo datetime={recipientObj?.lastSeen?.toDate()} />
                            </>
                        ) : (
                            'Not Available Yet'
                        )}
                    </p>
                    </div>
                </div>
        </Container>
    );
};

export default ChatHeader;
