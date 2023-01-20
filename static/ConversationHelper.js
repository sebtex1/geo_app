import React from "react";
import { auth, database } from "../config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ConversationHelper = {
  createConversation: (convName, users, setConversationId) => {
    console.info("Creating conversation");

    const createdAt = new Date();

    addDoc(collection(database, "conversations"), {
      createdAt,
      convName,
      users,
    })
      .then((result) => {
        setConversationId(result.id);
      })
      .catch((error) => {
        console.log(error);
        //todo: toast error
      });
  },
};

export default ConversationHelper;
