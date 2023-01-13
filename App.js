import {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './pages/Login';
import Home from './pages/Home';
import Map from './pages/Map';
import Firebase from "./pages/Firebase";
import { auth } from "./config/firebaseConfig";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
          <Stack.Screen name="Login" component={Login} />
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