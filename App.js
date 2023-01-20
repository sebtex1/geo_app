import { useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "react-native-vector-icons";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Chat from "./pages/Chat";
import { auth } from "./config/FirebaseConfig";
import FriendList from "./pages/FriendList";
import Conversations from "./pages/Conversations";
import UserList from './pages/UserList';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const LoginNavigator = createNativeStackNavigator();

const Theme = {
    dark: false,
    colors: {
        primary: "#F0B221",
        secondary: "#FFDA66",
        background: "#EFEDE7",
        text: "#222121",
        line: "#AAA9A5",
        icon: "#666563",
    },
};

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            labeled={false}
            activeColor="#000000"
            inactiveColor="#fefefe"
            barStyle={{ backgroundColor: "#02abff" }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="FriendList"
                component={FriendList}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="human" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Conversations"
                component={Conversations}
                options={{
                    tabBarIcon: ({ color }) => <Entypo name="chat" color={color} size={26} />,
                }}
            />
        </Tab.Navigator>
    );
}

function LoginPages() {
    return (
        <LoginNavigator.Navigator>
            <LoginNavigator.Group screenOptions={{ headerShown: false }}>
                <LoginNavigator.Screen name="checkEmal" component={Login} />
                <LoginNavigator.Screen name="signIn" component={SignIn} />
                <LoginNavigator.Screen name="signUp" component={SignUp} />
            </LoginNavigator.Group>
        </LoginNavigator.Navigator>
    );
}

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userCred] = useState({});

    //Listen to the user connection state
    useLayoutEffect(() => {
        console.log("useEffect" + userCred);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Logged in");
                setIsSignedIn(true);
            } else {
                console.log("Not logged in");
                setIsSignedIn(false);
            }
        });

        return unsubscribe;
    }, [userCred]);

    return (
        <NavigationContainer theme={Theme}>
            <Stack.Navigator>
                {isSignedIn === false ? (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={LoginPages} />
                    </Stack.Group>
                ) : (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="GeoApp" component={Tabs} />
                        <Stack.Screen name="Chat" component={Chat} />
                        <Stack.Screen name="UserList" component={UserList} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
