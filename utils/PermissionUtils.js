import * as Location from "expo-location";
import * as Linking from "expo-linking";

const PermissionUtils = {
    getLocationAcess: async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            Linking.openSettings();
            return false;
        } else {
            return true;
        }
    },
};

export default PermissionUtils;
