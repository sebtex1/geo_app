import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "@rneui/base";
import AccountHelper from "../static/AccountHelper";
import ConversationHelper from "../static/ConversationHelper";

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <Button title="Log out" onPress={() => AccountHelper.SignOut()} />
            {/* <Button title="Chat" onPress={() => navigation.navigate('Chat', { friendId: 'wQyFXbkfuIYwm3OXrX5c8QYjowD2' })}/> */}
            <Button
                title="Chat"
                onPress={() =>
                    navigation.navigate("Chat", {
                        conversationId: "wQyFXbkfuIYwm3OXrX5c8QYjowD2",
                    })
                }
            />
            <Button
                title="Conv"
                onPress={() =>
                    ConversationHelper.createConversation("Test conv", [
                        "HaQ0YTzRhLSkXtoetyX6s12pS7w1",
                        "wQyFXbkfuIYwm3OXrX5c8QYjowD2",
                    ])
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home;
