import { Text } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";
import BoutonLogin from "../components/BoutonLogin";
import FindyLogo from "../components/FindyLogo";
import InputField from "../components/InputField";
import AccountService from "../services/AccountService";
import CommonStyles from "../styles/CommonStyles";
import LoginStyles from "../styles/LoginStyle";

const SignUp = ({ route }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={CommonStyles.containerLoginScreen}>
            <FindyLogo />
            <View style={LoginStyles.containerFields}>
                <Text style={[CommonStyles.textLogin, { marginBottom: 30 }]}>Bienvenue !</Text>
                <InputField label="Mot de passe" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <InputField
                    label="Valider mot de passe"
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <BoutonLogin
                    onPress={() =>
                        password === confirmPassword
                            ? AccountService.signupWithEmail(route.params.email, password)
                            : console.log("Passwords not matching")
                    }
                />
            </View>
        </View>
    );
};

export default SignUp;
