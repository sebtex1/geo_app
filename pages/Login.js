import { Button, Input, Card, Text } from "@rneui/base";
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
            <View style={{ marginLeft: 30, marginRight: 30, flex: 2 }}>
                <Input style={{ backgroundColor: "#eac672" }} label="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingBottom: 10 }}>
                    <GoogleAuthButton />
                    <FacebookAuthButton />
                </View>
                <Card containerStyle={{ backgroundColor: "#FFDA66", borderColor: "#FFDA66", marginBottom: 20 }}>
                    <Text>Ton email permettra à tes amis de te retrouver sur Findy !</Text>
                </Card>
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
