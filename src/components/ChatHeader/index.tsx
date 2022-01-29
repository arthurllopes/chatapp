import { Avatar, IconButton } from '@material-ui/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { db } from '../../services/firebase';
import { Container } from './style';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from 'next/link';
type Props = {
    recipient: string
}
const ChatHeader = ({recipient}: Props) => {
    const [recipientObj, setRecipientObj] = React.useState<any>()
    React.useEffect(() => {
        async function getRecipient() {
            const userRef = query(collection(db, 'users'), where('email', '==', recipient))
            const recipientSnapShot = await getDocs(userRef)
            const recipientDoc = recipientSnapShot.docs[0]
            setRecipientObj(recipientDoc)
        }
        getRecipient()
    }, [recipient])

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
                    <Avatar src={recipientObj?.photoURL}>{recipient[0].toUpperCase()}</Avatar>
                    <div className="contact-info">
                    {recipient}
                    <p>Last seen</p>
                    </div>
                </div>
        </Container>
    );
};

export default ChatHeader;
