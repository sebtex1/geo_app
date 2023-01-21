import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "@rneui/base";
import AccountHelper from "../static/AccountHelper";
import ConversationHelper from "../static/ConversationHelper";
import UserHelper from "../static/UserHelper";
import { useState } from "react";
import { useEffect } from "react";

const Home = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);

    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <Button title="Log out" onPress={() => AccountHelper.SignOut()} />
            {/* <Button title="Chat" onPress={() => navigation.navigate('Chat', { friendId: 'wQyFXbkfuIYwm3OXrX5c8QYjowD2' })}/> */}
            <Button
                title="Chat"
                onPress={() =>
                    navigation.navigate("Chat", {
                        conversationId: "mwo6qrAQkVWBNFGHfzFH",
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
            <Button
                title="Create user"
                onPress={() => {
                    UserHelper.createUser(setUser);
                }}
            />
            <Button
                title="get user"
                onPress={() => {
                    UserHelper.getUser("HaQ0YTzRhLSkXtoetyX6s12pS7w1", setUser);
                }}
            />
            <Button
                title="get friends"
                onPress={() => {
                    UserHelper.getFriends(
                        "HaQ0YTzRhLSkXtoetyX6s12pS7w1",
                        setFriends
                    );
                }}
            />
            <Button
                title="add friends"
                onPress={() => {
                    UserHelper.addFriend("QlczoPfh3FZMjnptRGZvhTLvLfD3");
                }}
            />
            <Button
                title="getAllUsers"
                onPress={() => {
                    UserHelper.getAllUsers(friends, setFriends);
                }}
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
