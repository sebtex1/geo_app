import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore'
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../config/FirebaseConfig';

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            console.log('snapshot');
            console.log(snapshot.docs);
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        });
        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), { _id, createdAt, text, user });
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

export default Chat;