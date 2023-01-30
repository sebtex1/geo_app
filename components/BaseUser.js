import { Image, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BaseUser = (props) => {
    const conditionalIcon = (icon) => {
        switch (icon) {
            case "addFriend":
                return <MaterialCommunityIcons name={"account-plus"} size={26} />;
            case "location":
                return <MaterialCommunityIcons name={"map-marker"} size={26} />;
            case "unselected":
                return <MaterialCommunityIcons name={"radiobox-blank"} size={26} />;
            case "selected":
                return <MaterialCommunityIcons name={"radiobox-marked"} size={26} />;

            default:
                break;
        }
    };

    let avatar;
    switch (props.avatar) {
        case "man_1":
            avatar = require("../assets/default_avatars/man_1.png");
            break;
        case "man_2":
            avatar = require("../assets/default_avatars/man_2.png");
            break;
        case "man_3":
            avatar = require("../assets/default_avatars/man_3.png");
            break;
        case "man_4":
            avatar = require("../assets/default_avatars/man_4.png");
            break;
        case "man_5":
            avatar = require("../assets/default_avatars/man_5.png");
            break;
        case "girl_1":
            avatar = require("../assets/default_avatars/girl_1.png");
            break;
        case "girl_2":
            avatar = require("../assets/default_avatars/girl_2.png");
            break;
        case "girl_3":
            avatar = require("../assets/default_avatars/girl_3.png");
            break;
        case "girl_4":
            avatar = require("../assets/default_avatars/girl_4.png");
            break;
        case "girl_5":
            avatar = require("../assets/default_avatars/girl_5.png");
            break;
        case false:
            break;
    }

    return (
        <View>
            <Pressable
                onPress={() => {
                    props.onPressMethod(props.uid);
                }}
                // style={styles.container}
            >
                {/* style={styles.logo} */}
                <Image source={avatar} />

                {/* style={styles.text} */}
                <Text>{props.pseudo}</Text>
                {conditionalIcon(props.icon)}
                {/* style={styles.lastItem} */}
                <View>{props.children}</View>
            </Pressable>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         backgroundColor: "#dee0e5",
//         borderRadius: 10,
//         borderWidth: 3,
//         borderColor: "#93a3af",
//         paddingVertical: 10,
//         marginHorizontal: 16,
//         marginVertical: 4,
//     },
//     button: {
//         maxWidth: 270,
//         maxHeight: 50,
//         flex: 1,
//         flexDirection: "column",
//         justifyContent: "center",
//     },
//     text: {
//         textAlign: "left",
//         fontSize: 18,
//     },
//     logo: {
//         width: 50,
//         height: 50,
//         marginHorizontal: 15,
//         borderRadius: 50,
//     },
//     lastItem: {
//         alignItems: "flex-end",
//         marginHorizontal: 15,
//     },
// });

export default BaseUser;
