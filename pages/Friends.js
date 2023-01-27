import { Divider } from "@rneui/base";
import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import { auth } from "../config/FirebaseConfig";
import UserHelper from "../static/UserHelper";
import LocationUtil from "../utils/LocationUtil";

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [closestFriend, setClosestFriend] = useState(null);

    useLayoutEffect(() => {
        UserHelper.getFriends(auth.currentUser.uid, setFriends);
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
            } else if (
                LocationUtil.distanceBetween(userLocation.coords, friend.location.coords) <
                LocationUtil.distanceBetween(userLocation.coords, closestFriendVar.location.coords)
            ) {
                closestFriendVar = friend;
            }
        });
        setClosestFriend(closestFriendVar);
    }, [userLocation]);

    const getUserLocation = async () => {
        const currentPosition = await LocationUtil.getLocation();
        setUserLocation(currentPosition);
    };

    return (
        <View style={styles.container}>
            <SearchBar
                style={styles.searchBar}
                searchText={searchText}
                setSearchText={setSearchText}
                addFriendIcon={true}
                navigation={navigation}
                friendsList={friends}
            />
            {userLocation !== null && userLocation?.coords && closestFriend !== null ? (
                <View style={styles.closetFriendContainer}>
                    <User
                        navigation={navigation}
                        uid={closestFriend?.uid}
                        pseudo={closestFriend?.email}
                        avatar={closestFriend?.avatar}
                        hint={
                            userLocation !== null && userLocation?.coords !== null && closestFriend?.location
                                ? `à ${LocationUtil.distanceBetween(userLocation.coords, closestFriend.location.coords).toFixed(
                                      2
                                  )} km (le plus proche)`
                                : ""
                        }
                        addFriendIcon={false}
                    />
                    <Divider width={5} />
                </View>
            ) : null}
            <FlatList
                data={friends.filter((friend) => friend.uid !== closestFriend?.uid)}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                    return (
                        <User
                            navigation={navigation}
                            uid={item.uid}
                            pseudo={item.email}
                            avatar={item.avatar}
                            hint={
                                userLocation !== null && userLocation?.coords
                                    ? `à ${LocationUtil.distanceBetween(userLocation.coords, item.location.coords).toFixed(2)} km`
                                    : ""
                            }
                            addFriendIcon={false}
                        />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
    },
    closetFriendContainer: {
        flex: 1,
    },
});

export default Friends;
