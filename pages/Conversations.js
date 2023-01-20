import { Text } from "@rneui/base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Friend from "../components/Friend";
import { collection, addDoc, where, orderBy, query, onSnapshot } from "firebase/firestore";
import { auth, database } from "../config/FirebaseConfig";

const Conversations = () => {
    const [conversations, setConversations] = useState();

    //auth?.currentUser?.uid
    useLayoutEffect(() => {
        console.log(auth?.currentUser?.uid);
        const collectionRef = collection(database, "conversations");
        const q = query(
            collectionRef,
            where("users", "array-contains", "wQyFXbkfuIYwm3OXrX5c8QYjowD2"),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("snapshot");
            console.log(snapshot.docs[0]);
            setConversations(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    convName: doc.data().convName,
                    users: doc.data().users,
                }))
            );
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log(conversations);
    }, [conversations]);

    return (
        <View style={styles.container}>
            <Text>Welcome to the conversation tab</Text>
            <FlatList
                style={styles.container}
                data={friends}
                renderItem={({ item }) => <Friend lastName={item.lastName} firstName={item.firstName} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

//Todo: replace this with a list of conversations
const friends = [
    {
        id: "1",
        lastName: "Coujandassamy",
        firstName: "Olivier",
    },
    {
        id: "2",
        lastName: "Texier",
        firstName: "Sébastien",
    },
    {
        id: "3",
        lastName: "Strohl",
        firstName: "Lucas",
    },
    {
        id: "4",
        lastName: "Coujandassamy",
        firstName: "Olivier",
    },
    {
        id: "5",
        lastName: "Texier",
        firstName: "Sébastien",
    },
    {
        id: "6",
        lastName: "Strohl",
        firstName: "Lucas",
    },
    {
        id: "7",
        lastName: "Coujandassamy",
        firstName: "Olivier",
    },
    {
        id: "8",
        lastName: "Texier",
        firstName: "Sébastien",
    },
    {
        id: "9",
        lastName: "Strohl",
        firstName: "Lucas",
    },
    {
        id: "10",
        lastName: "Coujandassamy",
        firstName: "Olivier",
    },
    {
        id: "11",
        lastName: "Texier",
        firstName: "Sébastien",
    },
    {
        id: "12",
        lastName: "Strohl",
        firstName: "Lucas",
    },
    {
        id: "13",
        lastName: "Coujandassamy",
        firstName: "Olivier",
    },
    {
        id: "14",
        lastName: "Texier",
        firstName: "Sébastien",
    },
    {
        id: "15",
        lastName: "Strohl",
        firstName: "Lucas",
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
});

export default Conversations;
