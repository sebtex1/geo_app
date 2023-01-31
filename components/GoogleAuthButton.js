import { useEffect } from "react";
import { View, Button } from "react-native";
import { auth } from "../config/FirebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as GoogleAuthSession from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { GOOGLE_CLIENT_ID } from "@env";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthButton = () => {
    const [request, response, promptAsync] = GoogleAuthSession.useIdTokenAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === "success") {
            const credential = GoogleAuthProvider.credential(response.params.id_token);
            signInWithCredential(auth, credential)
                .then((response) => console.info("google response", response))
                .catch((error) => console.error("google error", error));
        }
    }, [response]);

    return (
        <View style={{ backgroundColor: "#ff6666" }}>
            <MaterialCommunityIcons
                name={"google"}
                color={"white"}
                size={40}
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
};

export default GoogleAuthButton;
