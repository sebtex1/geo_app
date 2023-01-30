import { Button, Text } from "@rneui/base";
import { useState } from "react";
import { View } from "react-native";
import { sendNotification } from "../services/NotificationPush";
import AccountService from "../services/AccountService";
import ConversationService from "../services/ConversationService";
import UserService from "../services/UserService";

const Profil = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const notification = {
        body: "Une application de tracker !",
        data: "hello world",
    };
    return (
        // style={styles.container}
        <View>
            <Text>Welcome!</Text>
            <Button title="Log out" onPress={() => AccountService.SignOut()} />
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
                    ConversationService.createConversation("Test conv", ["HaQ0YTzRhLSkXtoetyX6s12pS7w1", "wQyFXbkfuIYwm3OXrX5c8QYjowD2"])
                }
            />
            <Button
                title="Create user"
                onPress={() => {
                    UserService.createUser(setUser);
                }}
            />
            <Button
                title="get user"
                onPress={() => {
                    UserService.getUser("vdhGZK6chnZenvEe14lDfqzK4Jw2", setUser);
                    console.log("user: ", user);
                }}
            />
            <Button
                title="get friends"
                onPress={() => {
                    UserService.getFriends("HaQ0YTzRhLSkXtoetyX6s12pS7w1", setFriends);
                }}
            />
            <Button
                title="add friends"
                onPress={() => {
                    UserService.addFriend("QlczoPfh3FZMjnptRGZvhTLvLfD3");
                }}
            />
            <Button
                title="getAllUsers"
                onPress={() => {
                    UserService.getAllUsers(friends, setFriends);
                }}
            />
            <Button
                title="Notification push"
                onPress={async () => {
                    await sendNotification(notification);
                }}
            />
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

export default Profil;
