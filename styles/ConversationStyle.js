import { StyleSheet } from "react-native";

const ConversationStyle = StyleSheet.create({
    container: {
        borderColor: "#93a3af",
        paddingVertical: 10,
        marginVertical: 4,
        borderBottomWidth: 1,
    },
    row: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
    groupPic: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
        borderRadius: 50,
    },
    conversationName: {
        textAlign: "left",
        fontSize: 18,
    },
});

export default ConversationStyle;
