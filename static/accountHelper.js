import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const accountHelper = {
  signupAccountWithEmail: (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default accountHelper;
