import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/EvilIcons';

const OnBord = ({navigation}) => {
  return (
    <>
      <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <SafeAreaView style={styles.safeAreaContainer} />
        <StatusBar
          translucent
          backgroundColor={'#FFBF00'}
          barStyle={'light-content'}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: Display.setHeight(15),
          }}>
          <Image
            style={{width: Display.setWidth(90), height: Display.setHeight(34)}}
            source={require('../../Assets/OnBord.jpg')}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontFamily: FONTS.FontRobotoBold,
              width: Display.setWidth(80),
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: Display.setHeight(4),
            }}>
            Enjoy the freedom with environment awareness
          </Text>
          <Text
            style={{
              fontFamily: FONTS.FontRobotoRegular,
              fontSize: 14,
              color: '#BABABA',
              width: Display.setWidth(60),
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: Display.setHeight(4),
            }}>
            Quick choose your vehicle,Book it and enjoy the freedom
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: 'black',
              width: Display.setWidth(50),
              alignSelf: 'center',
              marginTop: Display.setHeight(4),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'yellow',
                marginVertical: 15,
                fontFamily: FONTS.FontRobotoRegular,
                fontSize: 15,
                flexDirection: 'row',
              }}>
              Find Partner
            </Text>
            <View style={{marginLeft: 15}}>
              <MaterialCommunityIcons
                name={'arrow-right'}
                color={'yellow'}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default OnBord;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
