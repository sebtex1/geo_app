import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import BaseUser from "../components/BaseUser";
import Header from "../components/Header";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";
import CommonStyles from "../styles/CommonStyles";
import AvatarUtil from "../utils/AvatarUtil";
import { sendNotificationToOther } from "../services/NotificationPushService";
import { auth } from "../config/FirebaseConfig";

const AddFriend = ({ route }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [recommendations, setRecommendations] = useState(null);
    const friendList = route.params.friendsList;
    const [isInitialized, setIsInitialized] = useState(false);

    //Get all users
    useEffect(() => {
        console.info("PAGE ADD FRIEND");
        UserService.getAllUsers(friendList, setUsers);
    }, []);

    //Remove loading screen
    useEffect(() => {
        if (users === null) return;
        if (users.length === 0) {
            setRecommendations([]);
            return;
        }
        if (isLoading) UserService.getFriendRecommendations(friendList, setRecommendations);
    }, [users]);

    //Remove loading screen
    useEffect(() => {
        if (users === null || recommendations === null) return;
        setIsLoading(false);
    }, [users, recommendations]);

    const onPressUser = (uid) => {
        console.log("onPressUser", uid);
        //TODO: open user profil page
    };

    const onPressIcon = (uid, fcmToken) => {
        UserService.addFriend(uid);
        setUsers(users.filter((user) => user.uid !== uid));
        setRecommendations(recommendations.filter((recommendation) => recommendation.uid !== uid));

        const notification = {
            body: `${auth.currentUser.email} vous a ajouté en ami !`,
            data: "hello !",
        };
        sendNotificationToOther(fcmToken, notification);
    };

    if (isLoading) return <Loader />;

    return (
        <View style={CommonStyles.containerAppScreen}>
            <Header title={"Ajouter un ami"} />
            <SearchBar searchText={searchText} setSearchText={setSearchText} addFriendIcon={false} />
            {recommendations.length > 0 && searchText === "" ? (
                <>
                    <FlatList
                        data={recommendations}
                        keyExtractor={(item) => item.uid}
                        renderItem={({ item }) => {
                            return (
                                <BaseUser
                                    uid={item.uid}
                                    pseudo={item?.email}
                                    fcmToken={item?.fcmToken}
                                    avatar={AvatarUtil.getAvatar(item?.avatar)}
                                    icon={"addFriend"}
                                    onPressMethod={onPressUser}
                                    onPressIconMethod={onPressIcon}
                                    hint={"Recommandé"}
                                />
                            );
                        }}
                    />
                </>
            ) : searchText === "" ? (
                <Text>Aucune recommendations</Text>
            ) : null}
            {searchText !== "" ? (
                <FlatList
                    data={searchText === "" ? users : users.filter((user) => user.email.startsWith(searchText))}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => {
                        return (
                            <BaseUser
                                uid={item.uid}
                                pseudo={item?.email}
                                fcmToken={item?.fcmToken}
                                avatar={AvatarUtil.getAvatar(item?.avatar)}
                                icon={"addFriend"}
                                onPressMethod={onPressUser}
                                onPressIconMethod={onPressIcon}
                            />
                        );
                    }}
                />
            ) : null}
        </View>
    );
};

export default AddFriend;
