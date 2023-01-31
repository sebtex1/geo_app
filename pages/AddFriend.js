import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import BaseUser from "../components/BaseUser";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";
import CommonStyles from "../styles/CommonStyles";

const AddFriend = ({ route }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const friendList = route.params.friendsList;

    useEffect(() => {
        UserService.getAllUsers(friendList, setUsers);
    }, [friendList]);

    useEffect(() => {
        console.log("Users :", users);
        if (users == null) return;
        setIsLoading(false);
    }, [users]);

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
