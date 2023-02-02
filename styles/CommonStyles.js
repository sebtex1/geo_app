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
    backgroundSecondary: {
        backgroundColor: "#eac672",
    },
    //LOADER
    loader: {
        flex: 1,
        justifyContent: "center",
    },
    textLogin: {
        textAlign: "center",
        fontSize: 36,
        fontWeight: "bold",
    },
});

export default commonStyles;
