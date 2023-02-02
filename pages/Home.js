import { View } from "react-native";
import FindyLogo from "../components/FindyLogo";
import CommonStyles from "../styles/CommonStyles";
import LoginStyle from "../styles/LoginStyle";
import CardText from "../components/CardText";
import BoutonLogin from "../components/BoutonLogin";
import FindyYellow from "../components/FindyYellow";

const Home = ({ navigation }) => {
    return (
        <View style={[CommonStyles.containerLoginScreen, CommonStyles.justifyContentStart]}>
            <FindyLogo />
            <View style={LoginStyle.containerFields}>
                <CardText text={"Partagez votre localisation avec vos amis pour mieux vous retrouver"} />
                <FindyYellow />
                <BoutonLogin
                    buttonStyle={{ marginBottom: 20 }}
                    onPress={() => {
                        navigation.navigate("checkEmail");
                    }}
                />
            </View>
        </View>
    );
};

export default Home;
