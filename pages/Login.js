import { Button, Input } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import FacebookAuthButton from "../components/FacebookAuthButton";
import FindyLogo from "../components/FindyLogo";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AccountService from "../services/AccountService";
import commonStyles from "../styles/CommonStyles";
import loginStyles from "../styles/LoginStyle";
import CardText from "../components/CardText";

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
        <View style={[commonStyles.containerLoginScreen, commonStyles.justifyContentStart]}>
            <FindyLogo />
            <View style={loginStyles.containerFields}>
                <Input style={commonStyles.backgroundSecondary} label="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <View style={loginStyles.containerSocialButtons}>
                    <GoogleAuthButton />
                    <FacebookAuthButton />
                </View>
                <CardText text={"Ton email permettra à tes amis de te retrouver sur Findy !"} />
                <Button
                    titleStyle={{ color: "black" }}
                    buttonStyle={{ borderColor: "black" }}
                    type="outline"
                    title="CONTINUER"
                    onPress={() => AccountService.checkEmail(email, setAuthMethods)}
                />
            </View>
        </View>
    );
};

export default Login;
