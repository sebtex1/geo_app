import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyC3c5UrTaZ5H3pb9bpgPdfzzzOX34EjYeo",
  authDomain: "geo-app-ynov.firebaseapp.com",
  projectId: "geo-app-ynov",
  storageBucket: "geo-app-ynov.appspot.com",
  messagingSenderId: "840342330616",
  appId: "1:840342330616:web:403099b9f0add97bacef0d",
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
