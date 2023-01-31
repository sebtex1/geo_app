import { Image, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import baseUserStyle from "../styles/BaseUserStyle";

const BaseUser = (props) => {
    const conditionalIcon = (icon) => {
        switch (icon) {
            case "addFriend":
                return <MaterialCommunityIcons name={"account-plus"} size={26} onPress={() => props.onPressIconMethod(props.uid)} />;
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

    return (
        <View>
            <Pressable
                onPress={() => {
                    props.onPressMethod(props.uid);
                }}
                style={baseUserStyle.containerBaseUser}
            >
                <View style={baseUserStyle.userPic}>
                    <Image style={baseUserStyle.profilePic} source={props.avatar} />
                </View>

                <View style={baseUserStyle.userInfo}>
                    <Text style={baseUserStyle.textBaseUser}>{props.pseudo}</Text>
                    {props.hint === undefined || props.hint === "" ? null : <Text style={baseUserStyle.hintText}>{props.hint}</Text>}
                </View>

                <View style={baseUserStyle.icon}>{conditionalIcon(props.icon)}</View>
            </Pressable>
        </View>
    );
};

export default BaseUser;
