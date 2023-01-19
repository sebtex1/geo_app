import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Input, Button } from "@rneui/base";
import AccountHelper from "../static/AccountHelper";

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
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="Check email"
        onPress={() => AccountHelper.checkEmail(email, setAuthMethods)}
      />
    </View>
  );
};

export default Login;
