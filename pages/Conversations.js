import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Conversation from "../components/Conversation";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";
import CommonStyles from "../styles/CommonStyles";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";
import Loader from "../components/Loader";
import Header from "../components/Header";
import AvatarUtil from "../utils/AvatarUtil";

const Conversations = ({ navigation }) => {
    const [conversations, setConversations] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const actions = [
        {
            text: "Add group",
            icon: require("../assets/pngegg.png"),
            name: "add group",
            position: 1,
        },
    ];

    useLayoutEffect(() => {
        console.info("PAGE CONVERSATIONS");
        ConversationService.getConversation(auth.currentUser.uid, setConversations);
        UserService.getUser(auth?.currentUser?.uid, setUser);
    }, []);

    useEffect(() => {
        if (user === null || conversations === null) return;
        setIsLoading(false);
    }, [user, conversations]);

    if (isLoading) return <Loader />;

    return (
        <View style={CommonStyles.containerAppScreen}>
            <Header avatar={AvatarUtil.getAvatar(user.avatar)} title={"Groupes"} />
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
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

export default Conversations;
