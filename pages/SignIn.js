import { Button, Text } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";
import FindyLogo from "../components/FindyLogo";
import InputField from "../components/InputField";
import AccountService from "../services/AccountService";
import commonStyles from "../styles/CommonStyles";
import loginStyles from "../styles/LoginStyle";

// "olivier@gmail.com", "olivierbigboss123!"
// "seb@gmail.com", "swaggySeb"
// "newseb@gmail.com", "123456"
const SignIn = ({ route }) => {
    const [password, setPassword] = useState("");

    return (
        <View style={commonStyles.containerLoginScreen}>
            <FindyLogo />
            <View style={loginStyles.containerFields}>
                <Text style={[commonStyles.textLogin, { marginBottom: 30 }]}>Te revoilà !</Text>
                <InputField label="Mot de passe" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <Button
                    titleStyle={{ color: "black" }}
                    buttonStyle={{ borderColor: "black", borderRadius: 10, borderWidth: 2 }}
                    type="outline"
                    title="CONTINUER"
                    onPress={() => AccountService.signinWithEmail(route.params.email, password)}
                />
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
