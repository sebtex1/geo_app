import React from "react";
import { FlatList, View } from "react-native";
import BaseUser from "./BaseUser";
import AvatarUtil from "../utils/AvatarUtil";

const UserList = (props) => {
    return (
        <View>
            <FlatList
                data={props.users}
                renderItem={({ item }) => {
                    return (
                        <BaseUser
                            uid={item.uid}
                            pseudo={item.email}
                            onPressMethod={props.onPressMethod}
                            icon={item.icon}
                            avatar={AvatarUtil.getAvatar(item.avatar)}
                        />
                    );
                }}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

export default UserList;
