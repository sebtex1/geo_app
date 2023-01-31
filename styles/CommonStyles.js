import { StyleSheet, StatusBar } from "react-native";

const commonStyles = StyleSheet.create({
    // CONTAINERS
    containerAppScreen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
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
});

export default commonStyles;
