import { useEffect } from "react";
import { auth } from "../config/FirebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as GoogleAuthSession from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { GOOGLE_CLIENT_ID } from "@env";
import Svg, { Circle, Path } from "react-native-svg";

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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M35.36 20.364c0-1.135-.102-2.226-.29-3.273H20v6.189h8.61c-.37 2-1.497 3.694-3.192 4.83v4.014h5.171c3.026-2.786 4.771-6.888 4.771-11.76Z"
                fill="#4285F4"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 36c4.32 0 7.942-1.433 10.59-3.876l-5.172-4.015c-1.433.96-3.265 1.527-5.418 1.527-4.167 0-7.695-2.814-8.953-6.596H5.702v4.146C8.335 32.413 13.745 36 20 36Z"
                fill="#34A853"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.047 23.04a9.618 9.618 0 0 1-.502-3.04c0-1.055.182-2.08.502-3.04v-4.146H5.702A15.994 15.994 0 0 0 4 20c0 2.582.618 5.026 1.702 7.186l5.345-4.146Z"
                fill="#FBBC05"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 10.364c2.35 0 4.458.807 6.116 2.392l4.59-4.589C27.934 5.585 24.312 4 20 4 13.745 4 8.335 7.585 5.702 12.815l5.345 4.145c1.258-3.782 4.786-6.596 8.953-6.596Z"
                fill="#EA4335"
            />
        </Svg>
    );
};

export default GoogleAuthButton;
