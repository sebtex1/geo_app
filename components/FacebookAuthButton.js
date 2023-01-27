import { useEffect } from 'react';
import { View, Button } from "react-native";
import { auth } from "../config/FirebaseConfig";
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { ResponseType } from 'expo-auth-session';
import  { FACEBOOK_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const FacebookAuthButton = () => {

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: FACEBOOK_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const credential = FacebookAuthProvider.credential(response.params.access_token);
            signInWithCredential(auth, credential)
            .then((response) => console.info("facebook response", response))
            .catch((error) => console.error("facebook error", error))
        }
    }, [response]);

    return (
        <View>
            <Button
                disabled={!request}
                title="Se connecter avec Facebook"
                onPress={() => { promptAsync() }} />
        </View>
    );
};
export default FacebookAuthButton;