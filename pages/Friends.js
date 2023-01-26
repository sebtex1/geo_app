import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import { auth } from "../config/FirebaseConfig";
import UserHelper from "../static/UserHelper";
import * as Location from "expo-location";

const Friends = ({ navigation }) => {
    const [friends, setFriends] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userLocation, setUserLocation] = useState(null);

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

    const getLocation = async () => {
        setUserLocation(await Location.getCurrentPositionAsync({}));
    };

    return (
        <SearchBar searchText={searchText} setSearchText={setSearchText} addFriendIcon={true} navigation={navigation} friendsList={friends}>
            <FlatList
                style={styles.flatList}
                data={friends}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                    return (
                        <User
                            navigation={navigation}
                            uid={item.uid}
                            pseudo={item.email}
                            hint={
                                userLocation !== null ? `à ${distanceBetween(userLocation.coords, item.location.coords).toFixed(2)} km` : ""
                            }
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

export default Friends;
