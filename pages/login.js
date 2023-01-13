import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "@rneui/base";
import accountHelper from "../static/accountHelper";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// "olivier@gmail.com", "olivierbigboss123!"
// "seb@gmail.com", "swaggySeb"
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [authMethods, setAuthMethods] = useState([]);

  useEffect(() => {
    console.log("authMethods: "+authMethods);
  }, [authMethods]);

  const test = () => {
    const a = accountHelper.checkEmail(email, setAuthMethods);
    console.log(a);
  }

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="check mail"
        onPress={() => test()}
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
