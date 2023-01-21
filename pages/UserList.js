import { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import User from "../components/User";
import UserHelper from "../static/UserHelper";
import SearchBar from "../components/SearchBar";
import { auth } from "../config/FirebaseConfig";

const UserList = ({ route }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState(null);
    const friendList = route.params.friendsList;

    useEffect(() => {
        console.log("friends", friendList);
        UserHelper.getAllUsers(friendList, setUsers);
    }, [friendList]);

    useEffect(() => {
        console.log("USERS", users);
    }, [users]);

    return (
        <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            addFriendIcon={false}
        >
            <FlatList
                style={styles.flatList}
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <User
                            uid={item.uid}
                            pseudo={item?.email}
                            addFriendIcon={true}
                        />
                    );
                }}
            />
        </SearchBar>
    );
};

const styles = StyleSheet.create({
    flatList: {
        marginTop: 5,
        marginBottom: 65,
        flex: 1,
        flexBasis: "auto",
        flexShrink: 0,
        flexGrow: 10,
    },
});

export default UserList;
