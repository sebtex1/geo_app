import { getDatabase, ref, get, set, child, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const userHelper = {
    get: (setFriends) => {
        const db = getDatabase()
        const dbRef = ref(db);
        get(child(dbRef, `users/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setFriends(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getById: (uid, setFriends) => {
        const db = getDatabase()
        const dbRef = ref(db);
        get(child(dbRef, `users/${uid}`))
                .then((snapshot) => {
                if (snapshot.exists()) {
                    setFriends(snapshot.val());
                } else {
                    console.log("user available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },
    setUserMe: (pseudo) => {
        const auth = getAuth();
        const db = getDatabase()

        const me = {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email
        }

        set(ref(db, `users/${me.uid}`), {
            email: me.email,
            pseudo: pseudo
        }
        );
    },
    setMyFriends: (uid, friendsList) => {
        const db = getDatabase()
        
        const updates = {}
        updates[`users/${uid}/friends`] = friendsList
        update(ref(db), updates);
    }
}

export default userHelper;