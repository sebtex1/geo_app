import * as Location from "expo-location";
import * as Linking from "expo-linking";

const PermissionUtils = {
    getPermissions: async (setter) => {
        let { status } = await Location.getPermissionsAsync();
        console.log("Permission to access location: " + status);
        if (status === "denied") {
            setter(false);
        } else if (status === "granted") {
            setter(true);
        }
    },

    getLocationAcess: async (setter) => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "denied") {
            Linking.openSettings();
            setter(false);
        } else if (status === "granted") {
            setter(true);
        } else {
            console.log("Permission to access location: " + status);
            setter(false);
        }
    },
};

export default PermissionUtils;
