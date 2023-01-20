import { Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Friend from "../components/Friend";
import { auth } from "../config/FirebaseConfig";
import ConversationHelper from "../static/ConversationHelper";

const Conversations = () => {
    const [conversations, setConversations] = useState();

    useEffect(() => {
        console.log("Number of conversations found: " + conversations.length);
    }, [conversations]);

    ConversationHelper.getConversation(
        auth?.currentUser?.uid,
        setConversations
    );

    return (
        <View style={styles.container}>
            <Text>Welcome to the conversation tab</Text>
            <FlatList
                style={styles.container}
                data={friends}
                renderItem={({ item }) => (
                    <Friend
                        lastName={item.lastName}
                        firstName={item.firstName}
                    />
                )}
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
