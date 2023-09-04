import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';

const Home = ({navigation}) => {
  return (
    <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'#FFBF00'}
        barStyle={'light-content'}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../../Assets/Home.png')} />
        <TouchableOpacity
          style={{
            backgroundColor: '#28a745',
            width: Display.setWidth(75),
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate('BookingForm')}>
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
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
