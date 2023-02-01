import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, database } from "../config/FirebaseConfig";

const ConversationService = {
    createConversation: (convName, users) => {
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
        console.info("Fetching conversations for user: " + auth?.currentUser?.uid);
        const q = query(collection(database, "conversations"), where("users", "array-contains", userId), orderBy("createdAt", "desc"));
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
    },

    getConversationByFriend: (friendUid, setConversation) => {
        // console.info("Fetching conversation for auth user and: " + friendUid);

        const convUsers = [auth?.currentUser?.uid, friendUid].sort();

        const q = query(collection(database, "conversations"), where("users", "==", convUsers));
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

export default ConversationService;
