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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Button} from 'react-native-paper';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import LoadingMoadal from '../../Componets/LoadingMoadal';

const Login = ({navigation, route}) => {
  const toast = useToast();
  const {Data} = route.params;
  // console.log("data",Data)
  const [code, setCode] = useState();
  const [BoxMove, setBoxMove] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [OtpShowTime, setOtpShowTime] = useState(false);
  const [timerOld, setTimerOld] = useState();
  const [loading, setLoading] = useState(false);

  const setOtpTime = () => {
    HandleClickResendOtp();
    var timeCount = 30;
    var getTimer = timerOld;
    if (getTimer) {
      clearInterval(getTimer);
    }
    var cntr = setInterval(() => {
      if (timeCount <= 1) {
        clearInterval(cntr);
        setOtpShowTime(true);
      } else {
        setOtpShowTime(false);
      }
      timeCount = timeCount - 1;
      setTimerOld(cntr);
      setSeconds(timeCount);
    }, 1000);
  };

  const HandleClick = async () => {
    toast.hideAll();
    setLoading(true);
    if (!code) {
      setLoading(false);
      toast.show('The verification code is required', {
        type: 'danger',
      });
    } else {
      const res = await Api.VerifyOtp({
        otp: code,
      }).catch(err => {
        toast.show(`${err?.message}`, {
          type: 'danger',
        });
        setLoading(false);
        // console.log(err);
      });
      if (res.data && res.data.status_code == 200) {
        setLoading(false);
        // console.log('otp verify res', res.data);
        AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(res?.data?.data?.user_data),
        );
        toast.show(`${res.data?.message}`, {
          type: 'success',
        });
        navigation.navigate('Home');
        // navigation.navigate('Otp', {Data: res.data.data});
        // console.log('tokon', res?.data?.data?.token);
      } else {
        setLoading(false);
        // console.log('otp verify res 2', res);
        toast.show(`${res.data?.message}`, {
          type: 'warning',
        });
      }
    }
  };

  const HandleClickResendOtp = async () => {
    toast.hideAll();
    const res = await Api.ResendOtp({}).catch(err => {
      setLoading(false);
      // console.log(err);
    });
    if (res.data) {
      setLoading(false);
      // console.log('otp resend res', res);
      toast.show(`${res.data?.message}`, {
        type: 'success',
      });
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
            height: Display.setHeight(33),
            marginTop: Display.setHeight(34),
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
              OTP to Taxi In Thrissur
            </Text>

            <OTPInputView
              style={{width: '100%', height: 60, marginTop: 15}}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                borderColor: code ? 'gray' : 'red',
                borderRadius: 5,
                color: 'black',
                fontFamily: FONTS.FontRobotoBold,
                fontSize: 22,
                height: 60,
                width: 60,
              }}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                //   onclose(false);
                //   navigation.navigate('');
                //   props.RegisterOtp(code);
                setCode(code);
              }}
              onCodeChanged={code => {
                //props.RegisterOtp(code)
                setCode(code);
              }}
            />
            {!code ? (
              <Text style={{fontSize: 12, color: 'red', marginTop: 2}}>
                Unable To Detect Code. Please Enter Manually
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', justifyContent: 'flex-end'}}
                onPress={() => setOtpTime()}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: FONTS.FontRobotoMedium,
                    marginRight: 10,
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={HandleClick}
              style={{
                backgroundColor: 'black',
                width: '40%',
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
                Verify
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
