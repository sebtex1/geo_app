import { Text } from "@rneui/base";
import PropTypes from "prop-types";
import React from "react";
import { Alert, Image, Pressable, View } from "react-native";
import ConversationStyle from "../styles/ConversationStyle";

//Todo: use this component for the conversation list
const Conversation = (props) => {
    return (
        <View style={ConversationStyle.container}>
            <Pressable
                style={ConversationStyle.row}
                onPress={() => props.navigation.navigate("Chat", { conversationId: props.convId, users: props.users })}
            >
                <Image style={ConversationStyle.groupPic} source={require("../assets/default_avatars/man_1.png")} />
                <Text style={ConversationStyle.conversationName}>{props.convName}</Text>
            </Pressable>
        </View>
    );
};

Conversation.propTypes = {
    _id: PropTypes.string,
    convName: PropTypes.string,
};

export default Conversation;
