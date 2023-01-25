import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BaseUser from "./BaseUser";

const UserList = (props) => {
    console.log("props friends", props.users);

    return (
        <View style={styles.flatList}>
            <FlatList
                style={styles.container}
                data={props.users}
                renderItem={({ item }) => {
                    return (
                        <BaseUser
                            uid={item.uid}
                            pseudo={item.email}
                            onPressMethod={props.onPressMethod}
                            icon={item.icon}
                            avatar={item.avatar}
                        />
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flatList: {
        marginTop: 5,
        marginBottom: 65,
        flex: 1,
        flexBasis: "auto",
        flexShrink: 0,
        flexGrow: 10,
    },
});

export default UserList;
