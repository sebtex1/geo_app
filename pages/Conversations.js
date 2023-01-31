import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Conversation from "../components/Conversation";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";
import CommonStyles from "../styles/CommonStyles";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";
import Loader from "../components/Loader";
import Header from "../components/Header";
import AvatarUtil from "../utils/AvatarUtil";
import FloatingButton from "../components/FloatingButton";

const Conversations = ({ navigation }) => {
    const [conversations, setConversations] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            <FloatingButton 
                text={"Create group"}
                icon={require("../assets/pngegg.png")}
                size={18}
                onPress={() => navigation.navigate("CreateGroup")}
            />
            
        </View>
    );
};

export default Conversations;
