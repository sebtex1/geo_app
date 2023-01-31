import { Image, Text } from "@rneui/base";
import { View } from "react-native";
import HeaderStyle from "../styles/HeaderStyle";

const Header = (props) => {
    return (
        <View style={HeaderStyle.header}>
            {props.avatar ? (
                <View style={HeaderStyle.headerLeft}>
                    <Image style={HeaderStyle.lilProfileImg} source={props.avatar} />
                </View>
            ) : null}

            <View style={HeaderStyle.headerCenterAndRight}>
                <Text style={HeaderStyle.textHeader}>{props.title}</Text>
            </View>
            <View style={HeaderStyle.headerCenterAndRight}>{props.children}</View>
        </View>
    );
};

export default Header;
