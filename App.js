import {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './pages/Login';
import Home from './pages/Home';
import Map from './pages/Map';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>      
      <Tab.Navigator
        initialRouteName="Login"
        labeled={false}
        activeColor="#000000"
        inactiveColor="#fefefe"
        barStyle={{ backgroundColor: '#02abff' }}
      >
        <Tab.Screen 
          name="Login" 
          component={Login} 
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
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