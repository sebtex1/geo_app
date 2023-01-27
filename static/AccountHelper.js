import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import * as WebBrowser from 'expo-web-browser';
import * as GoogleAuthSession from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import  { GOOGLE_CLIENT_ID } from "@env";

const AccountHelper = {
    signupWithEmail: (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    signinWithEmail: (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    SignOut: () => {
        auth.signOut()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    checkEmail: (email, setAuthMethods) => {
        fetchSignInMethodsForEmail(auth, email)
            .then((result) => {
                setAuthMethods(result);
            })
            .catch((error) => {
                console.log(error); // Peut indiquer une mauvaise écriture de email
            });
    },

    signinWithGoogle: () => {
        WebBrowser.maybeCompleteAuthSession();
        
        const [request, response, promptAsync] = GoogleAuthSession.useIdTokenAuthRequest({
            clientId: GOOGLE_CLIENT_ID
        });
        
        useEffect(() => {
            if (response?.type === 'success') {
                const credential = GoogleAuthProvider.credential(response.params.id_token);
                signInWithCredential(auth, credential);
            }
        }, [response]);

        promptAsync();
    },
};

export default AccountHelper;
