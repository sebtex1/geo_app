import { useTheme } from "@react-navigation/native";
import { Button, Input } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FacebookAuthButton from "../components/FacebookAuthButton";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AccountService from "../services/AccountService";

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

    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
        },
    });

    return (
        <View style={styles.container}>
            <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <Button title="Check email" onPress={() => AccountService.checkEmail(email, setAuthMethods)} />
            <GoogleAuthButton />
            <FacebookAuthButton />
        </View>
    );
};

export default Login;
