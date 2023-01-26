import { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import { auth } from "../config/FirebaseConfig";
import UserHelper from "../static/UserHelper";

const FriendList = ({ navigation }) => {
    const [friends, setFriends] = useState(null);

    const [searchText, setSearchText] = useState("");

    useLayoutEffect(() => {
        UserHelper.getFriends(auth.currentUser.uid, setFriends);
    }, []);

    return (
        <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            addFriendIcon={true}
            navigation={navigation}
            friendsList={friends}
        >
            <FlatList
                style={styles.flatList}
                data={friends}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <User
                            navigation={navigation}
                            uid={item.uid}
                            pseudo={item.email}
                            addFriendIcon={false}
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

export default FriendList;
