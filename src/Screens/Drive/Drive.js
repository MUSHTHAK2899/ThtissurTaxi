import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import Hedder from '../../Componets/Hedder';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingMoadal from '../../Componets/LoadingMoadal';

const Drive = ({HandleStartTrip,loading}) => {

  return (
    <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'#FFBF00'}
        barStyle={'light-content'}
      />
      {/* <Hedder name={'My Drives'} navigation={navigation} /> */}
      <ImageBackground
        source={require('../../Assets/LoginPage.png')}
        style={{flex: 1}}
        resizeMode="stretch">
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../Assets/MainLogo.jpg')}
            resizeMode="stretch"
            style={{width: 150, height: 150, borderRadius: 20}}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#28a745',
              width: Display.setWidth(75),
              borderRadius: 10,
              marginTop: 20,
            }}
            onPress={HandleStartTrip}>
            <Text
              style={{
                color: 'white',
                marginVertical: 18,
                textAlign: 'center',
                fontFamily: FONTS.FontRobotoBold,
                fontSize: 17,
              }}>
              Start Trip
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {loading && <LoadingMoadal />}
    </SafeAreaProvider>
  );
};

export default Drive;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
