import { StyleSheet } from "react-native";

const baseUserStyle = StyleSheet.create({
    containerBaseUser: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#dee0e5",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#93a3af",
        paddingVertical: 10,
        marginHorizontal: 16,
        marginVertical: 4,
    },
    logo: {
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
    childrenBaseUser: {
        alignItems: "flex-end",
        marginHorizontal: 15,
    },
});

export default baseUserStyle;
