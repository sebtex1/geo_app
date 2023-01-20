import { auth, database } from "../config/FirebaseConfig";
import {
    collection,
    where,
    query,
    onSnapshot,
    addDoc,
} from "firebase/firestore";
import { useLayoutEffect } from "react";
import { useEffect } from "react";

const UserHelper = {
    // get: (setFriends) => {
    //     const db = realTimeDB;
    //     const dbRef = ref(db);
    //     get(child(dbRef, `users/`))
    //         .then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 setFriends(snapshot.val());
    //             } else {
    //                 console.log("No data available");
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // },
    // getById: (uid, setFriends) => {
    //     const dbRef = ref(realTimeDB);
    //     get(child(dbRef, `users/${uid}`))
    //         .then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 setFriends(snapshot.val());
    //             } else {
    //                 console.log("user available");
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // },
    // setUserMe: (pseudo) => {
    //     const me = {
    //         uid: auth.currentUser.uid,
    //         email: auth.currentUser.email,
    //     };

    //     set(ref(realTimeDB, `users/${me.uid}`), {
    //         email: me.email,
    //         pseudo: pseudo,
    //     });
    // },
    // setMyFriends: (uid, friendsList) => {
    //     const updates = {};
    //     updates[`users/${uid}/friends`] = friendsList;
    //     update(ref(realTimeDB), updates);
    // },

    //Creates an user in firestore for the currently authenticated user in auth
    createUser: () => {
        const createdAt = new Date();
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const friends = [];

        addDoc(collection(database, "users"), {
            uid,
            createdAt,
            email,
            friends,
        })
            .then((result) => {
                console.info("User created: " + result.id);
            })
            .catch((error) => {
                console.error(error);
                //todo: toast error
            });
    },

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

    getFriends: (userId, setFriends) => {
        console.info("Fetching friend of user: " + userId);
        const q = query(
            collection(database, "users"),
            where("uid", "==", userId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const friends = snapshot.docs[0].data().friends;

            if (friends.length <= 0) return () => unsubscribe();

            const qF = query(
                collection(database, "users"),
                where("uid", "in", friends)
            );
            const unsubscribeFriends = onSnapshot(qF, (snapshotF) => {
                setFriends(
                    snapshotF.docs.map((doc) => ({
                        _id: doc.id,
                        uid: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        email: doc.data().email,
                        friends: doc.data().friends,
                    }))
                );
            });
        });
        return () => unsubscribe();
    },

    addFriend: (userId, friendId) => {},
};

export default UserHelper;
