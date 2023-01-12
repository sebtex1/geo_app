import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './pages/login';
import Map from './pages/map';

// const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Login}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Map"
          component={Map}
        />
      </Stack.Navigator> */}
      <View style={{ paddingTop: 50 }}></View>
      
      <Tab.Navigator
        initialRouteName="Home"
        labeled={false}
        activeColor="#000000"
        inactiveColor="#fefefe"
        barStyle={{ backgroundColor: '#02abff' }}
      >
        <Tab.Screen 
          name="Home" 
          component={Login} 
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
