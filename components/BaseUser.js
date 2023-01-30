import { Image, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AvatarUtil from "../utils/AvatarUtil";
import styles from "../styles/styles";

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
                style={styles.containerBaseUser}
            >
                <Image style={styles.logo} source={AvatarUtil.getAvatar(props.avatar)} />
                <View>
                    <Text style={styles.textBaseUser}>{props.pseudo}</Text>
                    <Text style={styles.hintText}>{props.hint}</Text>
                </View>
                {conditionalIcon(props.icon)}
                <View style={styles.childrenBaseUser}>{props.children}</View>
            </Pressable>
        </View>
    );
};

export default BaseUser;
