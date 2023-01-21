import { auth, database } from "../config/FirebaseConfig";
import { useLayoutEffect } from "react";
import {
    collection,
    where,
    orderBy,
    query,
    onSnapshot,
    addDoc,
} from "firebase/firestore";

const ConversationHelper = {
    createConversation: (convName, users) => {
        console.info("Creating conversation");

        const createdAt = new Date();

        addDoc(collection(database, "conversations"), {
            createdAt,
            convName,
            users,
        })
            .then((result) => {
                console.info("Conversation created: " + result.id);
            })
            .catch((error) => {
                console.log(error);
                //todo: toast error
            });
    },

    getConversation: (userId, setConversations) => {
        useLayoutEffect(() => {
            console.info(
                "Fetching conversations for user: " + auth?.currentUser?.uid
            );
            const q = query(
                collection(database, "conversations"),
                where("users", "array-contains", userId),
                orderBy("createdAt", "desc")
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setConversations(
                    snapshot.docs.map((doc) => ({
                        _id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        convName: doc.data().convName,
                        users: doc.data().users,
                    }))
                );
            });
            return () => unsubscribe();
        }, [setConversations, userId]);
    },

    getConversationByFriend: (friendUid, setConversation) => {
        console.info(
            "Fetching conversations for user: " + auth?.currentUser?.uid
        );

        const convUsers = [auth?.currentUser?.uid, friendUid].sort();

        const q = query(
            collection(database, "conversations"),
            where("users", "==", convUsers)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setConversation({
                _id: snapshot.docs[0].id,
                createdAt: snapshot.docs[0].data().createdAt.toDate(),
                convName: snapshot.docs[0].data().convName,
                users: snapshot.docs[0].data().users,
            });
        });
        return () => unsubscribe();
    },
};

export default ConversationHelper;
