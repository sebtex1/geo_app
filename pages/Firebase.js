import { Text, Button } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { auth } from "../config/firebaseConfig";
import accountHelper from "../static/accountHelper";

const Firebase = ({ navigation }) => {
  const [userCred, setUserCred] = useState({});

  //Listen to the user connection state
  useEffect(() => {
    console.log(userCred);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged in");
      } else {
        console.log("Not logged in");
      }
    });

    return unsubscribe;
  }, [userCred]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase</Text>
      <Button
        title="Signup"
        onPress={() =>
          accountHelper.signupWithEmail(
            "olivier@gmail.com",
            "olivierbigboss123!"
          )
        }
      />
      <Button
        title="Signin"
        onPress={() =>
          accountHelper.signinWithEmail(
            "olivier@gmail.com",
            "olivierbigboss123!",
            setUserCred
          )
        }
      />
      <Button
        title="Signout"
        onPress={() => accountHelper.SignOut(setUserCred)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Firebase;
