import { Button, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { auth } from "../config/firebaseConfig";
import AccountService from "../services/AccountService";

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
        // style={styles.container}
        <View>
            {/* style={styles.title} */}
            <Text>Firebase</Text>
            <Button title="Signup" onPress={() => AccountService.signupWithEmail("olivier@gmail.com", "olivierbigboss123!")} />
            <Button title="Signin" onPress={() => AccountService.signinWithEmail("olivier@gmail.com", "olivierbigboss123!", setUserCred)} />
            <Button title="Signout" onPress={() => AccountService.SignOut(setUserCred)} />
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         margin: 20,
//     },
//     title: {
//         fontWeight: "bold",
//         textAlign: "center",
//     },
// });

export default Firebase;
