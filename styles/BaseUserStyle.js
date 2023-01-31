import { StyleSheet } from "react-native";

const baseUserStyle = StyleSheet.create({
    containerBaseUser: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: "#93a3af",
        paddingVertical: 10,
        marginVertical: 4,
        borderBottomWidth: 1,
    },
    profilePic: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
        borderRadius: 50,
    },
    textBaseUser: {
        textAlign: "left",
        fontSize: 18,
    },
    hintText: {
        color: "#525354",
    },
    userPic: {
        flex: 2,
    },
    userInfo: {
        flex: 7,
    },
    icon: {
        flex: 1,
    },
});

export default baseUserStyle;
