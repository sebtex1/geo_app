import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // CONTAINERS
    containerAppScreen: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    containerProfil: {
        paddingTop: 40,
    },
    containerMap: {
        width: "100%",
        height: "70%",
    },
    containerGhostMode: {
        flexDirection: "row",
        alignItems: "center",
    },

    // PROFILE_IMAGE
    profileImg: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: "#666563",
    },
    lilProfileImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#666563",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerLeft: {
        flex: 1,
        paddingLeft: 10,
    },
    headerCenterAndRight: {
        flex: 1,
        paddingRight: 10,
        alignSelf: "flex-end",
    },

    textHeader: {
        textAlign: "center",
        fontSize: 19,
    },
    textEmail: {
        fontSize: 21,
        paddingTop: 15,
        paddingBottom: 15,
    },
});

export default styles;
