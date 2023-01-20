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
    createConversation: (convName, users, setConversationId) => {
        console.info("Creating conversation");

        const createdAt = new Date();

        addDoc(collection(database, "conversations"), {
            createdAt,
            convName,
            users,
        })
            .then((result) => {
                console.info("Conversation created: " + result.id);
                setConversationId(result.id);
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
};

export default ConversationHelper;
