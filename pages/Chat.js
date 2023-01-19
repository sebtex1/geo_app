import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { collection, addDoc, where, orderBy, query, onSnapshot } from 'firebase/firestore'
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../config/FirebaseConfig';
import PropTypes from 'prop-types';

const Chat = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef,
            where('receiver', '==', route.params.friendId),
            where('user._id', '==', auth?.currentUser?.uid),
            orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            console.log('snapshot');
            console.log(snapshot.docs[0]);
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                    receiver: doc.data().receiver
                }))
            )
        });
        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        
        const receiver = route.params.friendId;
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), { _id, createdAt, text, user, receiver });
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.uid,
                avatar: 'https://i.pravatar.cc/300'
            }}
            messagesContainerStyle={{
                backgroundColor: '#EFEDE7'
            }}
        />
    );
};

// Chat.PropTypes = {
//     friendId: PropTypes.string 
// }

export default Chat;
