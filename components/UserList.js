import React from "react";
import { FlatList, View } from "react-native";
import BaseUser from "./BaseUser";

const UserList = (props) => {
    return (
        // style={styles.flatList}
        <View>
            <FlatList
                // style={styles.container}
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
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

// const styles = StyleSheet.create({
//     flatList: {
//         marginTop: 5,
//         marginBottom: 65,
//         flex: 1,
//         flexBasis: "auto",
//         flexShrink: 0,
//         flexGrow: 10,
//     },
// });

export default UserList;
