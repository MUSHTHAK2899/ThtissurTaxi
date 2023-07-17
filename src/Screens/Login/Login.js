import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FONTS} from '../../Constants/Constants';
import {TextInput} from 'react-native-paper';
import Display from '../../utils/Display';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import {MotiView, MotiScrollView} from 'moti';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [BoxMove, setBoxMove] = useState(0);

  const HandleClick=()=>{
    navigation.navigate('Home')
  }

  return (
    <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'black'}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../../Assets/LoginImg.jpg')}
        style={{flex: 1}}
        resizeMode="stretch">
        <MotiView
          from={{opacity: 0, translateY: 500}}
          animate={{opacity: 0.8, translateY: BoxMove}}
          transition={{
            type: 'timing',
            duration: 1300,
          }}
          exit={{
            opacity: 0,
          }}
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            height: Display.setHeight(40),
            marginTop: Display.setHeight(30),
            borderRadius: 20,
            elevation: 50,
          }}>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.FontRobotoBold,
                fontSize: 18,
              }}>
              Sign in to TaxiInThrissur
            </Text>
            <TextInput
              label="Email"
              value={email}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              onPressIn={() => setBoxMove(-80)}
              label="Password"
              value={password}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
            onPress={HandleClick}
              style={{
                backgroundColor: 'black',
                width: '40%',
                marginTop: 20,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginVertical: 13,
                  textAlign: 'center',
                  color: 'yellow',
                  fontFamily: FONTS.FontRobotoMedium,
                  fontSize: 14,
                }}>
                Login
              </Text>
              <View style={{marginLeft: 5}}>
                <MaterialCommunityIcons
                  name={'arrow-right-circle'}
                  color={'yellow'}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </MotiView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  valueText: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    width: '100%',
    marginTop: 15,
  },
});
