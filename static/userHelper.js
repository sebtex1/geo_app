import { ref, get, set, child, update } from "firebase/database";
import { auth, realTimeDB } from '../config/FirebaseConfig'

const userHelper = {
    get: (setFriends) => {
        const db = realTimeDB
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
        const dbRef = ref(realTimeDB);
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
        const me = {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email
        }

        set(ref(realTimeDB, `users/${me.uid}`), {
            email: me.email,
            pseudo: pseudo
        }
        );
    },
    setMyFriends: (uid, friendsList) => {        
        const updates = {}
        updates[`users/${uid}/friends`] = friendsList
        update(ref(realTimeDB), updates);
    }
}

export default userHelper;