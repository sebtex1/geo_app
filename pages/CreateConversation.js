import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import UserList from "../components/UserList";
import { auth } from "../config/FirebaseConfig";
import UserHelper from "../static/UserHelper";

const CreateConversation = ({ navigation }) => {
    const [friends, setFriends] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

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
        console.log("Pressed on", uid);
        if (selectedFriends.includes(uid)) {
            setSelectedFriends(selectedFriends.filter((friend) => friend !== uid));
        } else {
            setSelectedFriends([...selectedFriends, uid]);
        }
    };

    //Create conversation
    const onPressValidate = () => {
        if (selectedFriends.length <= 1) return;
        const convMembers = [...selectedFriends, auth.currentUser.uid];
        console.log("Creating conversation with", convMembers);
    };

    //Fetch friends
    useLayoutEffect(() => {
        console.log("Creating group");
        UserHelper.getFriends(auth.currentUser.uid, setFriends);
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
        <View style={styles.flatList}>
            <UserList users={friends} navigation={navigation} onPressMethod={onPressUserMethod} />
            <FloatingAction
                actions={actions}
                overrideWithAction={true}
                onPressItem={(name) => {
                    onPressValidate();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flatList: {
        marginTop: 50,
        marginBottom: 65,
        flex: 1,
        flexBasis: "auto",
        flexShrink: 0,
        flexGrow: 10,
    },
});

export default CreateConversation;
