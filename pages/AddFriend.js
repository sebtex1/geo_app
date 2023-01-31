import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import BaseUser from "../components/BaseUser";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import UserService from "../services/UserService";
import CommonStyles from "../styles/CommonStyles";

const AddFriend = ({ route }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [recommendations, setRecommendations] = useState(null);
    const friendList = route.params.friendsList;

    //Get all users
    useEffect(() => {
        console.info("PAGE ADD FRIEND");
        UserService.getAllUsers(friendList, setUsers);
        UserService.getFriendRecommendations(friendList, setRecommendations);
    }, []);

    //Remove loading screen
    useEffect(() => {
        if (users === null || recommendations === null) return;
        setIsLoading(false);
    }, [users, recommendations]);

    const onPressMethod = (uid) => {
        console.log(uid);
        //TODO: open user profil page
    };

    const onPressIconMethod = (uid) => {
        console.log(uid);
        //TODO: add friend
    };

    if (isLoading) return <Loader />;

    return (
        <View style={CommonStyles.containerAppScreen}>
            <SearchBar searchText={searchText} setSearchText={setSearchText} addFriendIcon={false} />
            {recommendations.length > 0 ? (
                <>
                    <Text>recommendations</Text>
                    <FlatList
                        data={recommendations}
                        keyExtractor={(item) => item.uid}
                        renderItem={({ item }) => {
                            return <User uid={item.uid} pseudo={item?.email} fcmToken={item?.fcmToken} addFriendIcon={true} />;
                        }}
                    />
                </>
            ) : null}

            <FlatList
                data={users}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                    return (
                        <BaseUser uid={item.uid} pseudo={item?.email} fcmToken={item?.fcmToken} avatar={item?.avatar} icon={"addFriend"} />
                    );
                }}
            />
        </View>
    );
};

export default AddFriend;
