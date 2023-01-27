import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect, useState, useEffect } from "react";
import { LogBox } from "react-native";
import { Entypo, MaterialCommunityIcons } from "react-native-vector-icons";
import { auth } from "./config/FirebaseConfig";
import AddFriend from "./pages/AddFriend";
import Chat from "./pages/Chat";
import Conversations from "./pages/Conversations";
import CreateConversation from "./pages/CreateConversation";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserHelper from "./static/UserHelper";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const LoginNavigator = createNativeStackNavigator();

LogBox.ignoreAllLogs();

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
                name="Friends"
                component={Friends}
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
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!user) {
            UserHelper.createUser();
            setIsSignedIn(true);
        } else if (Object.keys(user).length != 0) {
            setIsSignedIn(true);
        }
    }, [user]);

    //Listen to the user connection state
    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                UserHelper.getUser(user.uid, setUser);
            } else {
                console.log("Not logged in");
                setIsSignedIn(false);
            }
        });

        return unsubscribe;
    }, []);

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
                        <Stack.Screen name="AddFriend" component={AddFriend} />
                        <Stack.Screen name="CreateGroup" component={CreateConversation} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
