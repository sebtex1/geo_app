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
        borderBottomColor: "#000",
        borderBottomWidth: 4,
    },
    containerMapView: {
        width: "100%",
        height: "100%",
    },
    containerGhostMode: {
        flexDirection: "row",
        alignItems: "center",
    },
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
    logo: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
        borderRadius: 50,
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
    textEmail: {
        fontSize: 21,
        paddingTop: 15,
        paddingBottom: 15,
    },
    textBaseUser: {
        textAlign: "left",
        fontSize: 18,
    },

    childrenBaseUser: {
        alignItems: "flex-end",
        marginHorizontal: 15,
    },
    hintText: {
        color: "#525354",
    },
});

export default styles;
