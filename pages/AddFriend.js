import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import BaseUser from "../components/BaseUser";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";

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

    if (isLoading) return <Loader />;

    return (
        <SearchBar searchText={searchText} setSearchText={setSearchText} addFriendIcon={false}>
            <FlatList
                // style={styles.flatList}
                data={users}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                    return (
                        <BaseUser
                            uid={item.uid}
                            pseudo={item?.email}
                            fcmToken={item?.fcmToken}
                            addFriendIcon={true}
                            avatar={item?.avatar}
                        />
                    );
                }}
            />
        </SearchBar>
    );
};

export default AddFriend;
