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
import {TextInput, Button} from 'react-native-paper';
import Display from '../../utils/Display';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import {MotiView, MotiScrollView} from 'moti';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingMoadal from '../../Componets/LoadingMoadal';
import { useToast } from "react-native-toast-notifications";

const Login = ({navigation}) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [BoxMove, setBoxMove] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [userLoginData, setUserLoginData] = useState({});
  const [loading, setLoading] = useState(false);


  const HandleClick = async () => {
    toast.hideAll()
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      toast.show("The Email and Password fields are required",{
        type:'danger',
      });
    } else {
      const res = await Api.Login({
        email: email,
        password: password,
      }).catch(err => {
        setLoading(false);
        console.log(err);
        toast.show( `${err?.message}`,{
          type:'danger',
        });
      });
      if (res.data && res.data.status == 200) {
        setLoading(false);
        console.log('login res', res?.data);
        setUserLoginData(res?.data?.data?.user_data);
        AsyncStorage.setItem(
          'userAccessToken',
          res?.data?.data?.user_data?.token,
        );
        AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(res?.data?.data?.user_data),
        );
        toast.show( `${res.data?.message}`,{
          type:'success',
        });
        
        if (res?.data?.data?.user_data?.verify_status == 1) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Otp', {Data: res?.data?.data?.user_data});
        }
        console.log('tokon', res?.data?.data?.user_data?.token);
      } else {
        setLoading(false);
        console.log('login res 2', res.data);
        toast.show( `${res.data?.message}`,{
          type:'warning',
        });
      }
    }
  };

  return (
    <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'black'}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../../Assets/LoginPage.png')}
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
            height: Display.setHeight(42),
            marginTop: Display.setHeight(24),
            borderRadius: 20,
            elevation: 50,
            flexDirection:"column",
            justifyContent:"center"
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
              keyboardType="email-address"
            />
            <TextInput
              onPressIn={() => setBoxMove(-30)}
              label="Password"
              value={password}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setPassword(text)}
              secureTextEntry={isEnabled ? true : false}
              right={
                <TextInput.Icon
                  style={styles.color}
                  onPress={() => setIsEnabled(!isEnabled)}
                  icon={isEnabled ? 'eye-off' : 'eye'}
                />
              }
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 6,
              }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{color: 'black', fontFamily: FONTS.FontRobotoMedium}}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={HandleClick}
              style={{
                backgroundColor: 'black',
                width: '40%',
                marginTop: 1,
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
                Log in
              </Text>
              <View style={{marginLeft: 5}}>
                <MaterialCommunityIcons
                  name={'arrow-right-circle'}
                  color={'yellow'}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('CreateAcount')}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FONTS.FontRobotoMedium,
                  fontSize: 16,
                }}>
                Create An Acoount
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </ImageBackground>
      {loading && <LoadingMoadal />}
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
