

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as GoogleAuthSession from 'expo-auth-session/providers/google';
import { View, Button, Text } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {

    const [request, response, promptAsync] = GoogleAuthSession.useAuthRequest({
        expoClientId: '656227441401-eh4o0no9mtdbu88tmpqb17jeedcps8sl.apps.googleusercontent.com',
        iosClientId: '656227441401-0241etrb7th54urrjnbdhlklib7k5v6p.apps.googleusercontent.com',
        androidClientId: '656227441401-jrdgmqvqg2ve9t3c28ct2b4s7jkipo99.apps.googleusercontent.com'
    });

    const [profile, setProfile] = React.useState()
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            try {
                fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + authentication?.accessToken)
                .then((response) => response.json())
                .then((json) => setProfile(json))
            } catch (error) {
                console.error(error);
            }
        }
    }, [response]);

    return (
        <View>
            <Button
                disabled={!request}
                title="Login Google"
                onPress={() => {
                    promptAsync();
                }}
            />
            
            <Text>{profile?.email}</Text>
            <Text>{profile?.family_name}</Text>
            <Text>{profile?.given_name}</Text>
        </View>
    );
}