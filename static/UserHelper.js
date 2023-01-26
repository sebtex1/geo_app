import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, database } from "../config/FirebaseConfig";
import ConversationHelper from "./ConversationHelper";

const UserHelper = {
    //Creates an user in firestore for the currently authenticated user in auth
    createUser: () => {
        const createdAt = new Date();
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const friends = [];
        const avatar = "https://i.pravatar.cc/300";

        addDoc(collection(database, "users"), {
            uid,
            createdAt,
            email,
            friends,
            avatar,
        })
            .then((result) => {
                console.info("User created: " + result.id);
            })
            .catch((error) => {
                console.error(error);
                //todo: toast error
            });
    },

    //Get a user by uid
    getUser: (userId, setUser) => {
        console.info("Fetching user: " + userId);

        const q = query(
            collection(database, "users"),
            where("uid", "==", userId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUser({
                _id: snapshot.docs[0].id,
                uid: snapshot.docs[0].data().uid,
                createdAt: snapshot.docs[0].data().createdAt.toDate(),
                email: snapshot.docs[0].data().email,
                friends: snapshot.docs[0].data().friends,
            });
        });
        return () => unsubscribe();
    },

    //Get all users not in user's friendlist
    getAllUsers: (friends, setUsers) => {
        console.info("Fetching all users");

        const friendsId = friends
            .map((friend) => friend.uid)
            .concat(auth.currentUser.uid);

        const q = query(
            collection(database, "users"),
            where("uid", "not-in", friendsId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsers(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    uid: doc.data().uid,
                    createdAt: doc.data().createdAt.toDate(),
                    email: doc.data().email,
                    friends: doc.data().friends,
                }))
            );
            unsubscribe();
        });
    },

    //Get friends of an user
    getFriends: (userId, setFriends) => {
        console.info("Fetching friend of user: " + userId);

        //Retrieve user's friend's uid
        const q = query(
            collection(database, "users"),
            where("uid", "==", userId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const friends = snapshot.docs[0].data().friends;

            if (friends.length <= 0) return () => unsubscribe();

            //Use the uids to retrieve the friends
            const qF = query(
                collection(database, "users"),
                where("uid", "in", friends)
            );
            const unsubscribeFriends = onSnapshot(qF, (snapshotF) => {
                setFriends(
                    snapshotF.docs.map((doc) => ({
                        _id: doc.id,
                        uid: doc.data().uid,
                        createdAt: doc.data().createdAt.toDate(),
                        email: doc.data().email,
                        friends: doc.data().friends,
                        location: doc.data().location,
                    }))
                );
            });
        });
        return () => unsubscribe();
    },

    //Add friend mutually
    addFriend: (friendId) => {
        const userId = auth.currentUser.uid;
        console.info("Adding friend for user: " + userId);

        const qUser = query(
            collection(database, "users"),
            where("uid", "==", userId)
        );

        const qFriend = query(
            collection(database, "users"),
            where("uid", "==", friendId)
        );

        console.log("ici");
        //Add authenticated user in friend's friendlist
        const unsubscribeF = onSnapshot(qFriend, (snapshot) => {
            const docRef = doc(database, "users", snapshot.docs[0].id);

            if (!snapshot.docs[0].data().friends.includes(userId)) {
                const friendList = snapshot.docs[0]
                    .data()
                    .friends.concat(userId);
                updateDoc(docRef, { friends: friendList });
                console.log("success");
            }

            unsubscribeF();
        });

        console.log("la");
        //Adding friend in authenticated user's friendlist
        const unsubscribe = onSnapshot(qUser, (snapshot) => {
            const docRef = doc(database, "users", snapshot.docs[0].id);

            if (!snapshot.docs[0].data().friends.includes(friendId)) {
                const friendList = snapshot.docs[0]
                    .data()
                    .friends.concat(friendId);
                updateDoc(docRef, { friends: friendList });
            }
            unsubscribe();
        });

        console.log("par ici");
        ConversationHelper.createConversation("", [userId, friendId].sort());

        return () => unsubscribe();
    },

    //Add location to user
    addLocation: (location) => {
        const userId = auth.currentUser.uid;
        console.info("Adding location for user: " + userId);

        const q = query(
            collection(database, "users"),
            where("uid", "==", userId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docRef = doc(database, "users", snapshot.docs[0].id);

            updateDoc(docRef, { location: location });

            unsubscribe();
        });
    },
};

export default UserHelper;
