import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import UserService from "../services/UserService";

const AddFriend = ({ route }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
    }, [users, recommendations]);

    if (loading)
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
        );

    return (
        <SafeAreaView>
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
                    return <User uid={item.uid} pseudo={item?.email} fcmToken={item?.fcmToken} addFriendIcon={true} />;
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loader: {
        justifyContent: "center",
        backgroundColor: "#F0B221",
    },
});

export default AddFriend;
