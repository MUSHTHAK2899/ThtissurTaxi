import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Screens/SplashScreen/Splash';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Screens/Login/Login';
import OnBord from '../Screens/OnBordScreen/OnBord';
import BottomTab from './BottomTab';
<<<<<<< HEAD
import BookingForm from '../Screens/BookingForm/BookingForm';
=======
import CreateAcount from '../Screens/CreateAccount/CreateAcount';
import Otp from '../Screens/OtpScreen/Otp';
import ForgotPassword from '../Screens/ForgotPaword/ForgotPass';
import ChangePassword from '../Screens/ForgotPaword/ChangePass';
import ResetPassword from '../Screens/MyAccount/ResetPassword';
import PreviewTrip from '../Screens/Trips/PreviewTrip';
import EditForm from '../Screens/Trips/EditForm';
import Wallet from '../Screens/Wallet/Index';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternet from '../utils/Nointernet';
>>>>>>> 17f6a46929cbd805c6990ea179c2a2438be8a5ec

const Stack = createStackNavigator();
const StackNavigation = () => {
  const netInfo = useNetInfo();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="OnBord" component={OnBord} />
<<<<<<< HEAD
    <Stack.Screen name="Home" component={BottomTab} />
    <Stack.Screen name="BookingForm" component={BookingForm} />
=======
    <Stack.Screen name="Home" component={ netInfo.isConnected ? BottomTab : NoInternet} />
    <Stack.Screen name="CreateAcount" component={CreateAcount} />
    <Stack.Screen name="Otp" component={Otp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="PreviewTrip" component={PreviewTrip} />
    <Stack.Screen name="EditForm" component={EditForm} />
    <Stack.Screen name="Wallet" component={Wallet} />
>>>>>>> 17f6a46929cbd805c6990ea179c2a2438be8a5ec
   
  </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})