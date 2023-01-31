import { Image, Text } from "@rneui/base";
import { View } from "react-native";
import commonStyles from "../styles/CommonStyles";

const Header = (props) => {
    return (
        <View style={commonStyles.header}>
            <View style={commonStyles.headerLeft}>
                <Image style={commonStyles.lilProfileImg} source={props.avatar} />
            </View>
            <View style={commonStyles.headerCenterAndRight}>
                <Text style={commonStyles.textHeader}>{props.title}</Text>
            </View>
            <View style={commonStyles.headerCenterAndRight} />
        </View>
    );
};

export default Header;
