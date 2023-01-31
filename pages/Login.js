import { Button, Input } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import FacebookAuthButton from "../components/FacebookAuthButton";
import FindyLogo from "../components/FindyLogo";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AccountService from "../services/AccountService";
import commonStyles from "../styles/CommonStyles";

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
            <View style={[commonStyles.alignItemsCenter, { flex: 1, justifyContent: "center" }]}>
                <FindyLogo />
            </View>
            <View style={{ flex: 2, alignItems: "center", backgroundColor: "white" }}>
                <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <GoogleAuthButton />
                <FacebookAuthButton />
                <Button title="CONTINUER" onPress={() => AccountService.checkEmail(email, setAuthMethods)} />
            </View>
        </View>
    );
};

export default Login;
