import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import CommonStyles from "../styles/CommonStyles";

const Loader = () => {
    return (
        <View style={CommonStyles.loader}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    );
};

export default Loader;
