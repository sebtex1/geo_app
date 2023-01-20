import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";

const FirebaseConfig = {
  apiKey: "AIzaSyC3c5UrTaZ5H3pb9bpgPdfzzzOX34EjYeo",
  authDomain: "geo-app-ynov.firebaseapp.com",
  projectId: "geo-app-ynov",
  storageBucket: "geo-app-ynov.appspot.com",
  messagingSenderId: "840342330616",
  appId: "1:840342330616:web:403099b9f0add97bacef0d",
  databaseURL: "https://geo-app-ynov-default-rtdb.europe-west1.firebasedatabase.app/"
};

let app;
let auth;
let database;
let realTimeDB;

// Initialize Firebase
try {
  app = initializeApp(FirebaseConfig);
  auth = getAuth(app);
  database = getFirestore();
  realTimeDB = getDatabase(app);
} catch (error) {
  console.log("Error:", error);
}

export { auth };
export { database };
export { realTimeDB };
