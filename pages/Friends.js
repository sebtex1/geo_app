import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BaseUser from "../components/BaseUser";
import Header from "../components/Header";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import { auth } from "../config/FirebaseConfig";
import ConversationService from "../services/ConversationService";
import UserService from "../services/UserService";
import CommonStyles from "../styles/CommonStyles";
import FriendsStyle from "../styles/FriendsStyle";
import AvatarUtil from "../utils/AvatarUtil";
import LocationUtil from "../utils/LocationUtil";

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [closestFriend, setClosestFriend] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //Get friends list and get user location
    useLayoutEffect(() => {
        console.info("PAGE FRIENDS");
        UserService.getFriends(auth.currentUser.uid, setFriends);
        UserService.getUser(auth?.currentUser?.uid, setUser);
        getUserLocation();
    }, []);

    useEffect(() => {
        if (friends.length === 0) {
            return;
        }
        let closestFriendVar = null;
        friends.forEach((friend) => {
            if (closestFriendVar === null) {
                closestFriendVar = friend;
            } else if (friend.location === null || friend.location === undefined) {
                return;
            } else if (
                LocationUtil.distanceBetween(userLocation.coords, friend.location.coords) <
                LocationUtil.distanceBetween(userLocation.coords, closestFriendVar.location.coords)
            ) {
                closestFriendVar = friend;
            }
        });
        setClosestFriend(closestFriendVar);
    }, [userLocation]);

    //Set isLoading to false when friends list and user are loaded
    useEffect(() => {
        if (friends === null || user === null) return;
        setIsLoading(false);
    }, [friends, user]);

    //Navigate to conversation with friend
    useEffect(() => {
        if (conversation === null) return;
        navigation.navigate("Chat", { conversationId: conversation._id });
    }, [conversation]);

    const getUserLocation = async () => {
        const currentPosition = await LocationUtil.getLocation();
        setUserLocation(currentPosition);
    };

    //Get conversation with selected friend
    const getFriendConversation = (uid) => {
        console.log(uid);
        ConversationService.getConversationByFriend(uid, setConversation);
    };

    if (isLoading) return <Loader />;

    return (
        <View style={CommonStyles.containerAppScreen}>
            <Header avatar={AvatarUtil.getAvatar(user.avatar)} title={"Amis"}>
                <MaterialCommunityIcons
                    name={"account-plus"}
                    size={26}
                    onPress={() => {
                        navigation.navigate("AddFriend", {
                            friendsList: friends,
                            navigation: navigation,
                        });
                    }}
                />
            </Header>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />

            {userLocation !== null && userLocation?.coords && closestFriend !== null ? (
                <View>
                    <BaseUser
                        navigation={navigation}
                        uid={closestFriend?.uid}
                        pseudo={closestFriend?.email}
                        avatar={AvatarUtil.getAvatar(closestFriend?.avatar)}
                        hint={
                            userLocation !== null && userLocation?.coords !== null && closestFriend?.location
                                ? `à ${LocationUtil.distanceBetween(userLocation.coords, closestFriend.location.coords).toFixed(
                                      2
                                  )} km (le plus proche)`
                                : ""
                        }
                        addFriendIcon={false}
                        onPressMethod={getFriendConversation}
                    />
                </View>
            ) : null}
            <UserList
                users={
                    searchText === ""
                        ? friends.filter((friend) => friend.uid !== closestFriend?.uid)
                        : friends
                              .filter((friend) => friend.uid !== closestFriend?.uid)
                              .filter((friend) => friend.email.startsWith(searchText))
                }
                onPressMethod={getFriendConversation}
            />
        </View>
    );
};

export default Friends;
