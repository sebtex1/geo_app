import { Switch, Text } from "@rneui/base";
import * as Location from "expo-location";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import User from "../components/User";
import { auth } from "../config/FirebaseConfig";
import UserHelper from "../static/UserHelper";
import LocationUtil from "../utils/LocationUtil";

const Map = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [count, setCount] = useState(0);
    const [friends, setFriends] = useState(null);
    const [checked, setChecked] = useState(false);
    const [currentLocationMarker, setCurrentLocationMarker] = useState(0);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useLayoutEffect(() => {
        UserHelper.getFriends(auth.currentUser.uid, setFriends);
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }
            getUserLocation();
        })();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 10e3); // 10 second delay
        getUserLocation();
        return () => clearTimeout(timer);
    }, [count]);

    const getUserLocation = async () => {
        const currentPosition = await LocationUtil.getLocation();
        setLocation(currentPosition);
        if (checked) {
            UserHelper.addLocation(null);
        } else {
            UserHelper.addLocation(location);
        }
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {location !== null && location?.coords?.latitude && location?.coords?.longitude ? (
                    <View>
                        <Marker
                            key={currentLocationMarker}
                            pinColor={checked ? "#EEC72A" : "#E11C1C"}
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            onPress={() => {
                                setSelectedMarker({
                                    uid: false,
                                    email: "You",
                                    location: location,
                                    avatar: false,
                                    icon: false,
                                });
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
                                          onPress={() => {
                                              setSelectedMarker({
                                                  uid: friend.uid,
                                                  email: friend.email,
                                                  location: friend.location,
                                                  avatar: friend.avatar,
                                              });
                                          }}
                                      />
                                  );
                              })
                            : null}
                    </View>
                ) : null}
            </MapView>
            <View style={styles.ghostModeContainer}>
                <Text>Ghost Mode: </Text>
                <Switch
                    value={checked}
                    onValueChange={(value) => {
                        setChecked(value);
                        getUserLocation();
                        setCurrentLocationMarker(currentLocationMarker + 1);
                    }}
                />
            </View>
            {selectedMarker ? (
                <User
                    navigation={navigation}
                    uid={selectedMarker?.uid}
                    pseudo={selectedMarker?.email}
                    avatar={selectedMarker?.avatar}
                    hint={`Position: ${selectedMarker?.location?.coords?.latitude.toFixed(
                        2
                    )}, ${selectedMarker?.location?.coords?.longitude.toFixed(2)}`}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    ghostModeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: "70%",
    },
});

export default Map;
