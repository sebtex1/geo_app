import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "@rneui/base";
import accountHelper from "../static/accountHelper";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [authMethods, setAuthMethods] = useState();

  useEffect(() => {
    if (authMethods?.length > 0 && authMethods[0] === "password") {
      navigation.navigate('SignIn', { email: email })
    } else if (authMethods?.length === 0) {
      navigation.navigate('SignUp', { email: email })
    }
  }, [authMethods]);

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="Check email"
        onPress={() => accountHelper.checkEmail(email, setAuthMethods)}
      />
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

export default Login;
