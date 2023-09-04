import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  Vibration,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FONTS} from '../Constants/Constants';
import {useNetInfo} from '@react-native-community/netinfo';
import Display from './Display';
import {Image} from 'react-native-elements';
const NoInternet = ({navigation, route}) => {
  const netInfo = useNetInfo();
  //   const {Retry, ApiCall} = route.params;
  //   const networkPress = () => {
  //     Vibration.vibrate([0, 200]);
  //     netInfo.isInternetReachable ? navigation.navigate(Retry) || ApiCall() : '';
  //   };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'#FFBF00'}
        barStyle={'dark-content'}
      />
      <View style={styles.ContentContainer}>
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Image
            source={require('../Assets/wifi.png')}
            style={{width: Display.setWidth(60), height: Display.setHeight(30)}}
          />
          <Text
            style={{
              fontSize: 39,
              color: 'black',
              fontFamily: FONTS.FontRobotoBold,
              marginTop: 67,
            }}>
            Ooops !
          </Text>
          <Text
            style={{
              width: 184,
              textAlign: 'center',
              fontSize: 14,
              fontFamily: FONTS.FontRobotoRegular,
              color: 'black',
              marginTop: 23,
              lineHeight: 22,
            }}>
            No internet Connection please check your network
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  ContentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
