import { useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator, View } from "react-native";
import User from "../components/User";
import UserService from "../services/UserService";
import SearchBar from "../components/SearchBar";

const AddFriend = ({ route }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const friendList = route.params.friendsList;

    useEffect(() => {
        UserService.getAllUsers(friendList, setUsers);
    }, [friendList]);

    useEffect(() => {
        console.log("Users :", users);
        if (users == null) return;
        setLoading(false);
    }, [users]);

    if (loading)
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
        );

    return (
        <SearchBar searchText={searchText} setSearchText={setSearchText} addFriendIcon={false}>
            <FlatList
                style={styles.flatList}
                data={users}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                    return (
                        <User uid={item.uid} pseudo={item?.email} fcmToken={item?.fcmToken} addFriendIcon={true} avatar={item?.avatar} />
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
    loader: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F0B221",
    },
});

export default AddFriend;
