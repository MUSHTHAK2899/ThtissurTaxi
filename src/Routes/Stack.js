import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Screens/SplashScreen/Splash';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Login/Login';
import OnBord from '../Screens/OnBordScreen/OnBord';
import BottomTab from './BottomTab';
import BookingForm from '../Screens/BookingForm/BookingForm';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="OnBord" component={OnBord} />
    <Stack.Screen name="Home" component={BottomTab} />
    <Stack.Screen name="BookingForm" component={BookingForm} />
   
  </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})