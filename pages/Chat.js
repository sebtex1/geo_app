import React, { useState, useLayoutEffect, useCallback, useEffect } from "react";
import { collection, addDoc, where, orderBy, query, onSnapshot } from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/FirebaseConfig";
import UserService from "../services/UserService";
import { sendNotificationToOther } from "../services/NotificationPushService";

const Chat = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState(null);

    useLayoutEffect(() => {
        const conversationId = route.params.conversationId;
        const collectionRef = collection(database, "chats");
        const q = query(collectionRef, where("conversationId", "==", conversationId), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
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

        const friendUid = route.params.users.filter((x) => x !== auth?.currentUser?.uid);
        UserService.getUsers(friendUid, setFriends);
    }, []);

    useEffect(() => {
        if (friends === null) return;
        const notification = {
            body: `${auth?.currentUser?.email} vous a envoyer un message !`,
            data: "hello !",
        };
        friends.forEach((friend) => {
            sendNotificationToOther(friend.fcmToken, notification);
        });
        setFriends(null);
    }, [friends]);

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
