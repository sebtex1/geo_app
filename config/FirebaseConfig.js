import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.log("Error:", error);
}

export { auth };
