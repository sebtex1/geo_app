import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import UserHelper from "../static/UserHelper";

import * as Location from "expo-location";
import { auth } from "../config/FirebaseConfig";

const Map = () => {
    const [location, setLocation] = useState(null);
    const [count, setCount] = useState(0);
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }
            getLocation();
        })();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 10e3); // 10 second delay
        getLocation();
        return () => clearTimeout(timer);
    }, [count]);

    useLayoutEffect(() => {
        UserHelper.getFriends(auth.currentUser.uid, setFriends);
    }, []);

    const getLocation = async () => {
        const userLocation = await Location.getCurrentPositionAsync({});
        UserHelper.addLocation(location);
        setLocation(userLocation);
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {location !== null && location?.coords?.latitude && location?.coords?.longitude ? (
                    <View>
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        />
                        {friends?.length > 0
                            ? friends?.map((friend) => {
                                  if (friend?.location === null || friend?.location === undefined) {
                                      return null;
                                  }
                                  return (
                                      <Marker
                                          key={friend.uid}
                                          pinColor="#5677B0"
                                          coordinate={{
                                              latitude: friend.location.coords.latitude,
                                              longitude: friend.location.coords.longitude,
                                          }}
                                      />
                                  );
                              })
                            : null}
                    </View>
                ) : null}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default Map;
