import { Image, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AvatarUtil from "../utils/AvatarUtil";
import baseUserStyle from "../styles/BaseUserStyle";

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

    return (
        <View>
            <Pressable
                onPress={() => {
                    props.onPressMethod(props.uid);
                }}
                style={baseUserStyle.containerBaseUser}
            >
                <Image style={baseUserStyle.logo} source={AvatarUtil.getAvatar(props.avatar)} />
                <View>
                    <Text style={baseUserStyle.textBaseUser}>{props.pseudo}</Text>
                    <Text style={baseUserStyle.hintText}>{props.hint}</Text>
                </View>
                {conditionalIcon(props.icon)}
                <View style={baseUserStyle.childrenBaseUser}>{props.children}</View>
            </Pressable>
        </View>
    );
};

export default BaseUser;
