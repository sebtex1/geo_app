import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import UserHelper from "../static/UserHelper";

import * as Location from "expo-location";

const Map = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [count, setCount] = useState(0);

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
        const timer = setTimeout(() => setCount(count + 1), 10e3); // 5 second delay
        getLocation();
        return () => clearTimeout(timer);
    }, [count]);

    const getLocation = async () => {
        const userLocation = await Location.getCurrentPositionAsync({});
        UserHelper.addLocation(location);
        setLocation(userLocation);
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {location !== null &&
                location?.coords?.latitude &&
                location?.coords?.longitude ? (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />
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
