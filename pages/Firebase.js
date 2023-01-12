import { Text, Button } from "@rneui/base";
import React from "react";
import { View, StyleSheet } from "react-native";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import accountHelper from "../static/accountHelper";

const Firebase = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase</Text>
      <Button
        title="test"
        onPress={() =>
          accountHelper.signupAccountWithEmail(
            "olivier@gmail.com",
            "olivierbigboss123!"
          )
        }
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
