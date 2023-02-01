import { Input } from "@rneui/base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import UserList from "../components/UserList";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";
import StringHelper from "../utils/StringUtil";
import UserService from "../services/UserService";
import CommonStyles from "../styles/CommonStyles";
import CreateConversationStyle from "../styles/CreateConversationStyle";
import FloatingButton from "../components/FloatingButton";
import Toast from "react-native-toast-message";

const CreateConversation = ({ navigation }) => {
    const [friends, setFriends] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [conversationName, setConversationName] = useState(false);

    //Update selectedFriends when selected or unselected
    const onPressUserMethod = (uid) => {
        selectedFriends.includes(uid)
            ? setSelectedFriends(selectedFriends.filter((friend) => friend !== uid))
            : setSelectedFriends([...selectedFriends, uid]);
    };

    //Create conversation
    const onPressValidate = () => {
        if (StringHelper.isBlank(conversationName)) {
            Toast.show({
                type: "error",
                text1: "Veuillez renseigner un nom de groupe",
                text2: "Le nom de groupe sera visible par tous les membres",
            });
            return;
        }

        if (selectedFriends.length <= 1) {
            Toast.show({
                type: "error",
                text1: "Veuillez sélectionner plus d'amis",
                text2: "Vous devez être au moins 3 pour créer un groupe",
            });
            return;
        }
        ConversationService.createConversation(conversationName, [...selectedFriends, auth.currentUser.uid]);
        navigation.goBack();
    };

    //Fetch friends
    useLayoutEffect(() => {
        console.info("PAGE CREATE CONVERSATION");
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
        <View style={[CommonStyles.containerAppScreen, CreateConversationStyle.container]}>
            <Input label="Group name" value={conversationName} onChangeText={(text) => setConversationName(text)} />
            <UserList users={friends} onPressMethod={onPressUserMethod} />
            <FloatingButton text={"Add group"} icon={require("../assets/validate.png")} size={20} onPress={() => onPressValidate()} />
            <Toast />
        </View>
    );
};

export default CreateConversation;
