import { StyleSheet } from "react-native";

const HeaderStyle = StyleSheet.create({
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
    lilProfileImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#666563",
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
});

export default HeaderStyle;
