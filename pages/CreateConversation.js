import { Input } from "@rneui/base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import UserList from "../components/UserList";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";
import StringHelper from "../helper/StringHelper";
import UserService from "../services/UserService";

const CreateConversation = ({ navigation }) => {
    const [friends, setFriends] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [conversationName, setConversationName] = useState(false);

    //Props for FloatingAction
    const actions = [
        {
            text: "Add group",
            icon: require("../assets/pngegg.png"),
            name: "add group",
            position: 1,
        },
    ];

    //Update selectedFriends when selected or unselected
    const onPressUserMethod = (uid) => {
        if (selectedFriends.includes(uid)) {
            setSelectedFriends(selectedFriends.filter((friend) => friend !== uid));
        } else {
            setSelectedFriends([...selectedFriends, uid]);
        }
    };

    //Create conversation
    const onPressValidate = () => {
        if (selectedFriends.length <= 1 || StringHelper.isBlank(conversationName)) return;
        ConversationService.createConversation(conversationName, [...selectedFriends, auth.currentUser.uid]);
        navigation.goBack();
    };

    //Fetch friends
    useLayoutEffect(() => {
        UserService.getFriends(auth.currentUser.uid, setFriends);
    }, []);

    //Initialize friends
    useEffect(() => {
        if (friends == null || isInitialized) return;
        setFriends(friends.map((friend) => ({ ...friend, icon: "unselected" })));
        setIsInitialized(true);
    }, [friends]);

    //Update friends when selected or unselected
    useEffect(() => {
        if (friends == null) return;
        setFriends(
            friends.map((friend) =>
                selectedFriends.includes(friend.uid) ? { ...friend, icon: "selected" } : { ...friend, icon: "unselected" }
            )
        );
    }, [selectedFriends]);

    return (
        // style={styles.flatList}
        <View>
            <Input label="Group name" value={conversationName} onChangeText={(text) => setConversationName(text)} />
            <UserList users={friends} navigation={navigation} onPressMethod={onPressUserMethod} />
            <FloatingAction
                actions={actions}
                overrideWithAction={true}
                onPressItem={(name) => {
                    onPressValidate();
                }}
                navigation={navigation}
            />
        </View>
    );
};

// const styles = StyleSheet.create({
//     flatList: {
//         marginTop: 50,
//         marginBottom: 65,
//         flex: 1,
//         flexBasis: "auto",
//         flexShrink: 0,
//         flexGrow: 10,
//     },
// });

export default CreateConversation;
