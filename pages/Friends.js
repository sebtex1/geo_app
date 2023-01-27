import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "@rneui/base";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import { auth } from "../config/FirebaseConfig";
import UserHelper from "../static/UserHelper";
import * as Location from "expo-location";

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [closestFriend, setClosestFriend] = useState(null);

    useLayoutEffect(() => {
        UserHelper.getFriends(auth.currentUser.uid, setFriends);
    }, []);

    function distanceBetween(user1, user2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (user1.latitude - user2.latitude) * (Math.PI / 180); // deg2rad below
        var dLon = (user1.longitude - user2.longitude) * (Math.PI / 180);
        var a =
            0.5 -
            Math.cos(dLat) / 2 +
            (Math.cos((user1.latitude * Math.PI) / 180) * Math.cos((user2.latitude * Math.PI) / 180) * (1 - Math.cos(dLon))) / 2;
        return R * 2 * Math.asin(Math.sqrt(a));
    }

    useEffect(() => {
        if (userLocation === null) {
            getLocation();
            return;
        }
    }, [userLocation]);

    useEffect(() => {
        if (friends.length === 0 && userLocation?.coords === null) {
            return;
        }
        let closestFriendVar = friends[0];
        for (let i = 0; i < friends.length; i++) {
            if (
                distanceBetween(userLocation.coords, friends[i].location.coords) <
                distanceBetween(userLocation.coords, closestFriendVar.location.coords)
            ) {
                closestFriendVar = friends[i];
            }
        }
        setClosestFriend(closestFriendVar);
        console.log("closestFriend", closestFriend);
    }, [userLocation]);

    const getLocation = async () => {
        setUserLocation(await Location.getCurrentPositionAsync({}));
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
            {userLocation !== null && userLocation?.coords !== null && closestFriend !== null ? (
                <View style={styles.viewTest}>
                    <User
                        navigation={navigation}
                        uid={closestFriend?.uid}
                        pseudo={closestFriend?.email}
                        hint={
                            userLocation !== null && userLocation?.coords !== null && closestFriend?.location
                                ? `à ${distanceBetween(userLocation.coords, closestFriend.location.coords).toFixed(2)} km (le plus proche)`
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
                            hint={
                                userLocation !== null && userLocation.coords !== null
                                    ? `à ${distanceBetween(userLocation.coords, item.location.coords).toFixed(2)} km`
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
    viewTest: {
        flex: 1,
    },
});

export default Friends;
