import {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './pages/login';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from './pages/Home';
import Map from './pages/map';
import { auth } from "./config/firebaseConfig";
import FriendList from './pages/friendList';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const LoginNavigator = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      activeColor="#000000"
      inactiveColor="#fefefe"
      barStyle={{ backgroundColor: '#02abff' }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Map"
        component={Map} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function LoginPages() {
  return (
    <LoginNavigator.Navigator>
      <LoginNavigator.Group screenOptions={{ headerShown: false }}>
        <LoginNavigator.Screen name="Login" component={Login} />
        <LoginNavigator.Screen name="SignIn" component={SignIn} />
        <LoginNavigator.Screen name="SignUp" component={SignUp} />
      </LoginNavigator.Group>
    </LoginNavigator.Navigator>
  )
}

export default function App() {
  const [isSignedIn, setIsSignedIn] =useState(false);
  const [userCred, setUserCred] = useState({});

  //Listen to the user connection state
  useEffect(() => {
    console.log(userCred);
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
    <NavigationContainer>
      <Stack.Navigator>
        { isSignedIn === false ? 
        (<Stack.Group>
          <Stack.Screen name="Login" component={LoginPages} />
        </Stack.Group>) : 
        (<Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GeoApp" component={Tabs} />
        </Stack.Group>) }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});