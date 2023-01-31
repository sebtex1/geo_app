import { Text } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";
import BoutonLogin from "../components/BoutonLogin";
import FindyLogo from "../components/FindyLogo";
import InputField from "../components/InputField";
import AccountService from "../services/AccountService";
import CommonStyles from "../styles/CommonStyles";
import LoginStyle from "../styles/LoginStyle";

// "olivier@gmail.com", "olivierbigboss123!"
// "seb@gmail.com", "swaggySeb"
// "newseb@gmail.com", "123456"
const SignIn = ({ route }) => {
    const [password, setPassword] = useState("");

    return (
        <View style={CommonStyles.containerLoginScreen}>
            <FindyLogo />
            <View style={LoginStyle.containerFields}>
                <Text style={[CommonStyles.textLogin, { marginBottom: 30 }]}>Te revoilà !</Text>
                <InputField label="Mot de passe" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <BoutonLogin onPress={() => AccountService.signinWithEmail(route.params.email, password)} />
            </View>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

export default SignIn;
