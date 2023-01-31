import { StyleSheet, StatusBar } from "react-native";

const commonStyles = StyleSheet.create({
    // CONTAINERS
    containerLoginScreen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#f0b221",
    },
    containerAppScreen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#F5FCFF",
    },
    alignItemsCenter: {
        alignItems: "center",
    },
    justifyContentStart: {
        justifyContent: "flex-start",
    },
    justifyContentCenter: {
        justifyContent: "center",
    },

    // PROFILE_IMAGE
    lilProfileImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#666563",
    },

    // HEADER
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#AAA9A5",
        borderBottomWidth: 1,
        paddingBottom: 5,
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

    // TEXT
    textHeader: {
        textAlign: "center",
        fontSize: 19,
    },
    //LOADER
    loader: {
        flex: 1,
        justifyContent: "center",
    },
});

export default commonStyles;
