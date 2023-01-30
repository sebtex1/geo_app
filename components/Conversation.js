import { Text } from "@rneui/base";
import PropTypes from "prop-types";
import React from "react";
import { Alert, Image, Pressable, View } from "react-native";

//Todo: use this component for the conversation list
const Conversation = (props) => {
    return (
        // style={styles.container}
        <View>
            <Pressable onPress={() => Alert.alert("ICON")}>
                <Image
                    // style={styles.logo}
                    source={{
                        uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                />
            </Pressable>
            {/* style={styles.button} */}
            <Pressable onPress={() => props.navigation.navigate("Chat", { conversationId: props.convId })}>
                {/* style={styles.text} */}
                <Text>{props.convName}</Text>
            </Pressable>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         backgroundColor: "#dee0e5",
//         borderRadius: 10,
//         borderWidth: 3,
//         borderColor: "#93a3af",
//         paddingVertical: 10,
//         marginHorizontal: 16,
//         marginVertical: 4,
//     },
//     button: {
//         flex: 1,
//         flexDirection: "column",
//         justifyContent: "center",
//         maxWidth: 270,
//         maxHeight: 50,
//         paddingVertical: 10,
//         paddingRight: 15,
//     },
//     text: {
//         fontSize: 18,
//     },
//     logo: {
//         width: 50,
//         height: 50,
//         marginHorizontal: 15,
//         borderRadius: 50,
//     },
// });

Conversation.propTypes = {
    _id: PropTypes.string,
    convName: PropTypes.string,
};

export default Conversation;
