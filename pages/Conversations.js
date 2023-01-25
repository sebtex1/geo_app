import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Conversation from "../components/Conversation";
import { auth } from "../config/FirebaseConfig";
import ConversationHelper from "../static/ConversationHelper";
import { FloatingAction } from "react-native-floating-action";

const Conversations = ({ navigation }) => {
    const [conversations, setConversations] = useState([]);

    useLayoutEffect(() => {
        ConversationHelper.getConversation(auth.currentUser.uid, setConversations);
    }, []);

    useEffect(() => {
        console.info("Number of conversations found: " + conversations.length);
    }, [conversations]);

    //Props for FloatingAction
    const actions = [
        {
            text: "Add group",
            icon: require("../assets/pngegg.png"),
            name: "add group",
            position: 1,
        },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.container}
                data={conversations}
                renderItem={({ item }) => {
                    return <Conversation convId={item._id} convName={item.convName} />;
                }}
                keyExtractor={(item) => item.id}
            />
            <FloatingAction
                actions={actions}
                overrideWithAction={true}
                onPressItem={(name) => {
                    navigation.navigate("CreateGroup");
                }}
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
