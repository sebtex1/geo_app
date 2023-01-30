import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";
import { sendNotificationToOther } from "../services/NotificationPush";
import UserService from "../services/UserService";

const User = (props) => {
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        if (conversation == null) return;
        props.navigation.navigate("Chat", {
            conversationId: conversation._id,
        });
    }, [conversation]);

    return (
        <View>
            <Pressable
                onPress={() => {
                    console.log(props.uid);
                    if (props.uid === false) {
                        Alert.alert(props.pseudo);
                        return;
                    }
                    ConversationService.getConversationByFriend(props.uid, setConversation);
                }}
                style={styles.container}
            >
                <Pressable onPress={() => Alert.alert(props.pseudo)}>
                    {props.avatar === false ? null : (
                        <Image
                            style={styles.logo}
                            source={{
                                uri: props.avatar,
                            }}
                        />
                    )}
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.pseudo}</Text>
                    <Text style={styles.hint}>{props.hint}</Text>
                </View>

                {props.icon === false ? null : (
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name={props.addFriendIcon ? "account-plus" : "map-marker"}
                        size={26}
                        onPress={() => {
                            if (props.addFriendIcon) {
                                UserService.addFriend(props.uid);
                                const notification = {
                                    body: `${auth.currentUser.email} vous a ajouté en ami !`,
                                    data: "hello !",
                                };
                                console.log("props.fcmToken", props.fcmToken);
                                sendNotificationToOther(props.fcmToken, notification);
                            }
                        }}
                    />
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#dee0e5",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#93a3af",
        paddingVertical: 10,
        marginHorizontal: 16,
        marginVertical: 4,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
    },
    button: {
        maxWidth: 270,
        maxHeight: 50,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    text: {
        textAlign: "left",
        fontSize: 18,
    },
    hint: {
        color: "#525354",
    },
    logo: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
        borderRadius: 50,
    },
    icon: {
        marginHorizontal: 15,
    },
});

export default User;
