import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import {LogBox} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  /*Process to add Firebase Authentication */
  const {user} = useAuth();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            options={{headerShown: false}}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{headerShown: false}}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  //Test
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen
  //         name="Home"
  //         options={{headerShown: false}}
  //         component={HomeScreen}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

}
