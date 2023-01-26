import React, { useState, useLayoutEffect, useCallback } from "react";
import { collection, addDoc, where, orderBy, query, onSnapshot } from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/FirebaseConfig";

const Chat = ({ route }) => {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        console.info("Conversation ID:", route.params.conversationId);
        const conversationId = route.params.conversationId;
        const collectionRef = collection(database, "chats");
        const q = query(collectionRef, where("conversationId", "==", conversationId), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.info("Number of messages:", snapshot.docs.length);
            setMessages(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                    conversationId: doc.data().conversationId,
                }))
            );
        });
        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

        const conversationId = route.params.conversationId;
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, "chats"), {
            _id,
            createdAt,
            text,
            user,
            conversationId,
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth?.currentUser?.uid,
                avatar: "https://i.pravatar.cc/300",
            }}
            messagesContainerStyle={{
                backgroundColor: "#EFEDE7",
            }}
        />
    );
};

export default Chat;
