import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/base";
import AccountHelper from "../static/AccountHelper";

const SignUp = ({ route, navigation }) => {
  const [email, setEmail] = useState(route.params.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        label="Confirm Password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button
        title="Register"
        onPress={() => password === confirmPassword ? AccountHelper.signupWithEmail(email, password) : console.log('Passwords not matching')}
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

export default SignUp;
