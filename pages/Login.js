import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BoutonLogin from "../components/BoutonLogin";
import CardText from "../components/CardText";
import FacebookAuthButton from "../components/FacebookAuthButton";
import FindyLogo from "../components/FindyLogo";
import GoogleAuthButton from "../components/GoogleAuthButton";
import InputField from "../components/InputField";
import AccountService from "../services/AccountService";
import CommonStyles from "../styles/CommonStyles";
import LoginStyle from "../styles/LoginStyle";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [authMethods, setAuthMethods] = useState();

    useEffect(() => {
        if (authMethods?.length > 0 && authMethods[0] === "password") {
            navigation.navigate("signIn", { email: email });
        } else if (authMethods?.length === 0) {
            navigation.navigate("signUp", { email: email });
        }
    }, [authMethods]);

    return (
        <View style={[CommonStyles.containerLoginScreen, CommonStyles.justifyContentStart]}>
            <FindyLogo />
            <View style={LoginStyle.containerFields}>
                <InputField label="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <View style={LoginStyle.containerSocialButtons}>
                    <GoogleAuthButton />
                    <FacebookAuthButton />
                </View>
                <CardText text={"Ton email permettra à tes amis de te retrouver sur Findy !"} />
                <BoutonLogin onPress={() => AccountService.checkEmail(email, setAuthMethods)} />
            </View>
        </View>
    );
};

export default Login;
