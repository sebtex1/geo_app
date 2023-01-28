import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AccountService from "../services/AccountService";

// "olivier@gmail.com", "olivierbigboss123!"
// "seb@gmail.com", "swaggySeb"
// "newseb@gmail.com", "123456"
const SignIn = ({ route, navigation }) => {
    const [email, setEmail] = useState(route.params.email ?? "");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <Input label="Password" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={() => AccountService.signinWithEmail(email, password)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default SignIn;
