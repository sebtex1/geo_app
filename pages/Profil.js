import { Button } from "@rneui/base";
import { View, Image, Text } from "react-native";
import AccountService from "../services/AccountService";
import styles from "../styles/styles";
import UserService from "../services/UserService";
import { useLayoutEffect, useState } from "react";
import { auth } from "../config/FirebaseConfig";
import AvatarUtil from "../utils/AvatarUtil";
// import { sendNotification } from "../services/NotificationPush";
// import ConversationService from "../services/ConversationService";

const Profil = () => {
    const [user, setUser] = useState({});

    // const [friends, setFriends] = useState([]);
    // const notification = {
    //     body: "Une application de tracker !",
    //     data: "hello world",
    // };

    useLayoutEffect(() => {
        UserService.getUser(auth?.currentUser?.uid, setUser);
    }, []);

    return (
        // style={styles.container}
        <View style={styles.containerAppScreen}>
            {/* <Text>Welcome!</Text> */}
            <Image style={styles.profileImg} source={AvatarUtil.getAvatar(user.avatar)} />
            <Text style={styles.textEmail}>{user.email}</Text>
            <Button title="Log out" onPress={() => AccountService.SignOut()} />
            {/* <Button title="Chat" onPress={() => navigation.navigate('Chat', { friendId: 'wQyFXbkfuIYwm3OXrX5c8QYjowD2' })}/> */}
            {/* <Button
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
            /> */}
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
