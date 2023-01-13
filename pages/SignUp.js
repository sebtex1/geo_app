import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/base";
import accountHelper from "../static/accountHelper";

// "olivier@gmail.com", "olivierbigboss123!"
// "seb@gmail.com", "swaggySeb"
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [authMethods, setAuthMethods] = useState();

  useEffect(() => {
    console.log(authMethods);
  }, [authMethods]);

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="check mail"
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

export default SignUp;
