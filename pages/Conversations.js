import React, { useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Conversation from "../components/Conversation";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";

const Conversations = ({ navigation }) => {
    const [conversations, setConversations] = useState([]);
    const actions = [
        {
            text: "Add group",
            icon: require("../assets/pngegg.png"),
            name: "add group",
            position: 1,
        },
    ];

    useLayoutEffect(() => {
        ConversationService.getConversation(auth.currentUser.uid, setConversations);
    }, []);

    return (
        // style={styles.container}
        <View>
            <FlatList
                // style={styles.container}
                data={conversations.filter((conv) => conv.users.length > 2)}
                renderItem={({ item }) => {
                    return <Conversation convId={item._id} convName={item.convName} navigation={navigation} />;
                }}
                keyExtractor={(item) => item._id}
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 50,
//     },
// });

export default Conversations;
