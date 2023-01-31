import { useEffect } from "react";
import { auth } from "../config/FirebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { ResponseType } from "expo-auth-session";
import { FACEBOOK_CLIENT_ID } from "@env";
import Svg, { Circle, Path } from "react-native-svg";

WebBrowser.maybeCompleteAuthSession();

const FacebookAuthButton = () => {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: FACEBOOK_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === "success") {
            const credential = FacebookAuthProvider.credential(response.params.access_token);
            signInWithCredential(auth, credential)
                .then((response) => console.info("facebook response", response))
                .catch((error) => console.error("facebook error", error));
        }
    }, [response]);

    return (
        <Svg
            width={41}
            height={41}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onPress={() => {
                promptAsync();
            }}
        >
            <Circle cx={20.5} cy={20.5} r={20.5} fill="#D9D9D9" />
            <Path
                d="M37 20.541C37 11.411 29.608 4 20.5 4S4 11.41 4 20.541c0 8.006 5.676 14.673 13.2 16.21V25.505h-3.3V20.54h3.3v-4.135c0-3.192 2.59-5.79 5.775-5.79H27.1v4.963h-3.3c-.908 0-1.65.744-1.65 1.654v3.308h4.95v4.963h-4.95V37C30.483 36.173 37 29.126 37 20.541Z"
                fill="#1877F2"
            />
        </Svg>
    );
};
export default FacebookAuthButton;
