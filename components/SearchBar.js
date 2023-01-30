import { SafeAreaView, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Friends = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    containerStyle={styles.searchBar}
                    placeholder="Rechercher..."
                    lightTheme
                    round
                    value={props.searchText}
                    onChangeText={(text) => {
                        props.setSearchText(text);
                    }}
                />
                {props.addFriendIcon ? (
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name="account-plus"
                        size={35}
                        onPress={() => {
                            props.navigation.navigate("AddFriend", {
                                friendsList: props.friendsList,
                                navigation: props.navigation,
                            });
                        }}
                    />
                ) : null}
            </View>
            {props.children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "25%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0B221",
        paddingVertical: 8,
    },
    searchBar: {
        flexBasis: "auto",
        flexShrink: 1,
        flexGrow: 9,
        backgroundColor: "#F0B221",
        borderColor: "#fff",
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    icon: {
        flex: 1,
        flexBasis: 10,
        flexShrink: 1,
        flexGrow: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
    },
});

export default Friends;
