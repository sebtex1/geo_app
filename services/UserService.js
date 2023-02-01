import { addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, database } from "../config/FirebaseConfig";
import ConversationService from "./ConversationService";
import { getToken } from "./NotificationPushService";

const UserService = {
    //Creates an user in firestore for the currently authenticated user in auth
    createUser: async (setUserDocumentId) => {
        const createdAt = new Date();
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const friends = [];
        const avatar = (Math.floor(Math.random() * 2) === 0 ? "man_" : "girl_") + (Math.floor(Math.random() * 5) + 1);
        const fcmToken = await getToken();

        addDoc(collection(database, "users"), {
            uid,
            createdAt,
            email,
            friends,
            avatar,
            fcmToken,
        })
            .then((result) => {
                console.info("User created: " + result.id);
                setUserDocumentId(result.id);
            })
            .catch((error) => {
                console.error(error);
                //todo: toast error
            });
    },

    //Get a user by uid
    getUser: (userId, setUser) => {
        console.info("Fetching user: " + userId);

        const q = query(collection(database, "users"), where("uid", "==", userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUser(
                snapshot.docs[0]
                    ? {
                          _id: snapshot.docs[0].id,
                          uid: snapshot.docs[0].data().uid,
                          createdAt: snapshot.docs[0].data().createdAt.toDate(),
                          email: snapshot.docs[0].data().email,
                          friends: snapshot.docs[0].data().friends,
                          avatar: snapshot.docs[0].data().avatar,
                          fcmToken: snapshot.docs[0].data().fcmToken,
                      }
                    : undefined
            );
        });
        return () => unsubscribe();
    },

    //Get multiple users
    getUsers: (usersId, setUsers) => {
        console.info("Fetching asked users");

        const q = query(collection(database, "users"), where("uid", "in", usersId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsers(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    uid: doc.data().uid,
                    createdAt: doc.data().createdAt.toDate(),
                    email: doc.data().email,
                    friends: doc.data().friends,
                    fcmToken: doc.data().fcmToken,
                    avatar: doc.data().avatar,
                    location: doc.data().location,
                }))
            );
            unsubscribe();
        });
    },

    //Get all users not in user's friendlist
    getAllUsers: (friends, setUsers) => {
        console.info("Fetching all users");

        const friendsId = friends.map((friend) => friend.uid).concat(auth.currentUser.uid);

        const q = query(collection(database, "users"), where("uid", "not-in", friendsId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsers(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    uid: doc.data().uid,
                    createdAt: doc.data().createdAt.toDate(),
                    email: doc.data().email,
                    friends: doc.data().friends,
                    fcmToken: doc.data().fcmToken,
                    avatar: doc.data().avatar,
                    location: doc.data().location,
                }))
            );
            unsubscribe();
        });
    },

    //Get friends of an user
    getFriends: (userId, setFriends) => {
        console.info("Fetching friend of user: " + userId);

        //Retrieve user's friend's uid
        const q = query(collection(database, "users"), where("uid", "==", userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const friends = snapshot.docs[0].data().friends;

            if (friends.length <= 0) return () => unsubscribe();

            //Use the uids to retrieve the friends
            const qF = query(collection(database, "users"), where("uid", "in", friends));
            const unsubscribeFriends = onSnapshot(qF, (snapshotF) => {
                setFriends(
                    snapshotF.docs.map((doc) => ({
                        _id: doc.id,
                        uid: doc.data().uid,
                        createdAt: doc.data().createdAt.toDate(),
                        email: doc.data().email,
                        friends: doc.data().friends,
                        avatar: doc.data().avatar,
                        location: doc.data().location,
                        fcmToken: doc.data().fcmToken,
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

        const qUser = query(collection(database, "users"), where("uid", "==", userId));

        const qFriend = query(collection(database, "users"), where("uid", "==", friendId));

        //Add authenticated user in friend's friendlist
        const unsubscribeF = onSnapshot(qFriend, (snapshot) => {
            const docRef = doc(database, "users", snapshot.docs[0].id);

            if (!snapshot.docs[0].data().friends.includes(userId)) {
                const friendList = snapshot.docs[0].data().friends.concat(userId);
                updateDoc(docRef, { friends: friendList });
                console.log("success");
            }

            unsubscribeF();
        });

        //Adding friend in authenticated user's friendlist
        const unsubscribe = onSnapshot(qUser, (snapshot) => {
            const docRef = doc(database, "users", snapshot.docs[0].id);

            if (!snapshot.docs[0].data().friends.includes(friendId)) {
                const friendList = snapshot.docs[0].data().friends.concat(friendId);
                updateDoc(docRef, { friends: friendList });
            }
            unsubscribe();
        });

        ConversationService.createConversation("", [userId, friendId].sort());

        return () => unsubscribe();
    },

    //Add location to user
    addLocation: (location) => {
        const userId = auth.currentUser.uid;
        console.info("Adding location for user: " + userId);

        const q = query(collection(database, "users"), where("uid", "==", userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docRef = doc(database, "users", snapshot.docs[0].id);

            updateDoc(docRef, { location: location });

            unsubscribe();
        });
    },

    getFriendRecommendations: (friendList, setRecommendations) => {
        console.info("Generating friend recommendations");

        let recommendations = [];
        friendList.forEach((friend) => {
            recommendations.push(...friend.friends);
        });

        recommendations = [...new Set(recommendations)];
        friendList.map((friend) => {
            if (recommendations.includes(friend.uid)) {
                recommendations = recommendations.filter((recommendation) => recommendation !== friend.uid);
            }
        });

        recommendations = recommendations.filter((recommendation) => recommendation !== auth.currentUser.uid);
        if (recommendations.length === 0) {
            setRecommendations([]);
            return;
        }

        const q = query(collection(database, "users"), where("uid", "in", recommendations));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setRecommendations(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    uid: doc.data().uid,
                    createdAt: doc.data().createdAt.toDate(),
                    email: doc.data().email,
                    friends: doc.data().friends,
                    fcmToken: doc.data().fcmToken,
                    avatar: doc.data().avatar,
                    location: doc.data().location,
                }))
            );
            unsubscribe();
        });
    },
};

export default UserService;
