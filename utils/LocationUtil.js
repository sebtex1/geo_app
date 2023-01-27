import * as Location from "expo-location";

const LocationUtil = {
    distanceBetween: (location1, location2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = (location1.latitude - location2.latitude) * (Math.PI / 180); // deg2rad below
        var dLon = (location1.longitude - location2.longitude) * (Math.PI / 180);
        var a =
            0.5 -
            Math.cos(dLat) / 2 +
            (Math.cos((location1.latitude * Math.PI) / 180) * Math.cos((location2.latitude * Math.PI) / 180) * (1 - Math.cos(dLon))) / 2;
        return R * 2 * Math.asin(Math.sqrt(a));
    },

    getLocation: async () => {
        const currentPosition = await Location.getCurrentPositionAsync({});
        return currentPosition;
    },
};

export default LocationUtil;
