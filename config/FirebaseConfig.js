import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import {
    FIREBASE_CONFIG_API_KEY,
    FIREBASE_CONFIG_AUTH_DOMAIN,
    FIREBASE_CONFIG_PROJECT_ID,
    FIREBASE_CONFIG_STORAGE_BUCKET,
    FIREBASE_CONFIG_MESSAGING_SEND_ID,
    FIREBASE_CONFIG_APP_ID,
} from "@env";

const FirebaseConfig = {
    apiKey: FIREBASE_CONFIG_API_KEY,
    authDomain: FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_CONFIG_MESSAGING_SEND_ID,
    appId: FIREBASE_CONFIG_APP_ID,
};

let app;
let auth;
let database;

// Initialize Firebase
try {
    app = initializeApp(FirebaseConfig);
    auth = getAuth(app);
    database = getFirestore();
} catch (error) {
    console.log("Error:", error);
}

export { auth };
export { database };
