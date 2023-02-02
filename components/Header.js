import { Image, Text } from "@rneui/base";
import { Pressable, View } from "react-native";
import HeaderStyle from "../styles/HeaderStyle";

const Header = (props) => {
    console.log("HEADER", props.navigation)
    return (
        <View style={HeaderStyle.header}>
            <View style={HeaderStyle.top}></View>
            {props.avatar ? (
                <View style={HeaderStyle.headerLeft}>
                    <Pressable onPress={() => props.navigation.navigate('Profil')}>
                    <Image style={HeaderStyle.lilProfileImg} source={props.avatar} />
                    </Pressable>
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
