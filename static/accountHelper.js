import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const accountHelper = {
  signupWithEmail: (email, password, setUserCred) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUserCred(response);
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

  SignOut: (setUserCred) => {
    auth
      .signOut()
      .then((response) => {
        console.log(response);
        setUserCred({});
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default accountHelper;
