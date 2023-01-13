import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/base";
import accountHelper from "../static/accountHelper";

const Login = ({ navigation }) => {
  const [loginTitle, setLoginTitle] = useState("Check email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState(0);

  // "olivier@gmail.com", "olivierbigboss123!"
  // "seb@gmail.com", "swaggySeb"
  const checkLogin = () => {
    switch (state) {
      case 0:
        if (email !== "") {
          setState(1);
          setLoginTitle("Login");
        } else {
          console.log("Email is mandatory");
        }
        break;
      case 1:
        if (email !== "" && password !== "") {
          const test = accountHelper.signinWithEmail(email, password);
          if (test === undefined) {
            setState(2);
            setLoginTitle("Register");
          }
        } else {
          console.log("Email & password is mandatory");
        }
        break;
      case 2:
        if (email !== "" && password !== "" && confirmPassword === password) {
          accountHelper.signupWithEmail(email, password);
        } else {
          console.log("Check your logs");
        }
        break;
      default:
        console.log("Something went wrong with state");
    }
  };

  const checkEmail = () => {};

  const inputEmail = React.createRef();
  const inputPassword = React.createRef();
  const btnBack = React.createRef();
  const [authMethods, setAuthMethods] = useState();

  useEffect(() => {
    console.log(authMethods);
  }, [authMethods]);

  return (
    <View style={styles.container}>
      <Input
        ref={inputEmail}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {state !== 0 ? (
        <Input
          ref={inputPassword}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      ) : null}
      {state === 2 ? (
        <Input
          label="Confirm password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
      ) : null}
      <Button title={loginTitle} onPress={() => checkLogin()} />
      <Button
        title="check mail"
        onPress={() => accountHelper.checkEmail(email, setAuthMethods)}
      />
      {state === 2 ? (
        <Button
          ref={btnBack}
          title="Login"
          onPress={() => {
            setState(1);
            inputEmail.current.clear();
            inputPassword.current.clear();
          }}
        />
      ) : null}
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
