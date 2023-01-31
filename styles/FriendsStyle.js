import { StatusBar, StyleSheet } from "react-native";

const friendsStyle = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fbb",
        flex: 1,
    },
    topRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    searchBar: { flex: 9 },
    icon: { flex: 1 },
});

export default friendsStyle;
