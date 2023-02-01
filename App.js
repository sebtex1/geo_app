import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useEffect, useLayoutEffect, useState } from "react";
import { LogBox, View } from "react-native";
import { setCustomText } from "react-native-global-props";
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
import Profil from "./pages/Profil";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserService from "./services/UserService";
import FindyLogo from "./components/FindyLogo";
import CommonStyles from "./styles/CommonStyles";
import LoginStyle from "./styles/LoginStyle";
import CardText from "./components/CardText";
import BoutonLogin from "./components/BoutonLogin";
import FindyYellow from "./components/FindyYellow";
import PermissionUtils from "./utils/PermissionUtils";
import CustomTextProps from "./styles/GlobalStyle";

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
    const [fontsLoaded] = useFonts({
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    });

    setCustomText(CustomTextProps);
    return (
        <Tab.Navigator
            initialRouteName="Profil"
            labeled={false}
            activeColor="#fff"
            inactiveColor="#000"
            barStyle={{ backgroundColor: "#F0B221" }}
        >
            <Tab.Screen
                name="Profil"
                component={Profil}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
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
                <LoginNavigator.Screen name="home" component={Home} />
                <LoginNavigator.Screen name="checkEmail" component={Login} />
                <LoginNavigator.Screen name="signIn" component={SignIn} />
                <LoginNavigator.Screen name="signUp" component={SignUp} />
            </LoginNavigator.Group>
        </LoginNavigator.Navigator>
    );
}

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({});
    const [gpsAccepted, setGpsAccepted] = useState(false);

    useEffect(() => {
        if (!user) {
            UserService.createUser();
            setIsSignedIn(true);
        } else if (Object.keys(user).length !== 0) {
            setIsSignedIn(true);
        }
    }, [user]);

    //Listen to the user connection state
    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                UserService.getUser(user.uid, setUser);
            } else {
                console.log("Not logged in");
                setIsSignedIn(false);
            }
        });

        return unsubscribe;
    }, []);

    const GPS = () => {
        PermissionUtils.getPermissions(setGpsAccepted);
        return (
            <View style={[CommonStyles.containerLoginScreen, CommonStyles.justifyContentStart]}>
                <FindyLogo />
                <View style={LoginStyle.containerFields}>
                    <CardText text={"Findy a besoin d’accès à ta localisation pour aider tes amis à te retrouver"} />
                    <FindyYellow />
                    <BoutonLogin
                        buttonStyle={{ marginBottom: 20 }}
                        onPress={() => {
                            PermissionUtils.getLocationAcess(setGpsAccepted);
                        }}
                    />
                </View>
            </View>
        );
    };

    return (
        <NavigationContainer theme={Theme}>
            <Stack.Navigator>
                {isSignedIn === false ? (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={LoginPages} />
                    </Stack.Group>
                ) : gpsAccepted === false ? (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="GPS" component={GPS} />
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
