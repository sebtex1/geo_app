import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Conversation from "../components/Conversation";
import { auth } from "../config/FirebaseConfig";
import ConversationHelper from "../static/ConversationHelper";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);

    useLayoutEffect(() => {
        ConversationHelper.getConversation(
            auth.currentUser.uid,
            setConversations
        );
    }, []);

    useEffect(() => {
        console.log("Number of conversations found: " + conversations.length);
    }, [conversations]);

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.container}
                data={conversations}
                renderItem={({ item }) => {
                    return (
                        <Conversation
                            convId={item._id}
                            convName={item.convName}
                        />
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
});

export default Conversations;
