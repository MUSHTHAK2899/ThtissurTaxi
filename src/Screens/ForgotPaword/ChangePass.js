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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import LoadingMoadal from '../../Componets/LoadingMoadal';
import Api from '../../Api/GeneralApi';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const ChangePassword = ({navigation, route}) => {
  const toast = useToast();
  const {email} = route.params;
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [BoxMove, setBoxMove] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [loading, setLoading] = useState(false);

  const HandleClick = async () => {
    toast.hideAll()
    setLoading(true);
    if (!email || !password || !conformPassword || !code) {
      setLoading(false);
      toast.show('The password field is required', {
        type: 'danger',
      });
    } else {
      const res = await Api.ResetPassword({
        otp: code,
        email: email,
        password: password,
        password_confirmation: conformPassword,
      }).catch(err => {
        setLoading(false);
        // console.log(err);
        toast.show(`${err?.message}`, {
          type: 'danger',
        });
      });
      if (res.data && res.data.status_code == 200) {
        setLoading(false);
        // console.log('login res', res?.data);
        toast.show(`${res.data?.message}`, {
          type: 'success',
        });
        navigation.navigate('Login');
      } else {
        setLoading(false);
        // console.log('login res 2', res.data);
        toast.show(`${res.data?.message}`, {
          type: 'warning',
        });
      }
    }
  };

  const HandleClickResendOtp = async () => {
    setLoading(true);
    const res = await Api.ForgotPassword({
      email: email,
    }).catch(err => {
      setLoading(false);
      // console.log(err);
      toast.show(`${err?.message}`, {
        type: 'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      // console.log('login res', res?.data);
      toast.show(`${res.data?.message}`, {
        type: 'success',
      });
    } else {
      setLoading(false);
      // console.log('login res 2', res.data);
      toast.show(`${res.data?.message}`, {
        type: 'warning',
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
            height: Display.setHeight(60),
            marginTop: Display.setHeight(20),
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
              Change Password 
            </Text>

            <OTPInputView
              style={{width: '88%', height: 60, marginTop: 15}}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                borderColor: code ? 'gray' : 'red',
                borderRadius: 5,
                color: 'black',
                fontFamily: FONTS.FontRobotoBold,
                fontSize: 22,
                height: 50,
                width: 50,
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
                onPress={() => HandleClickResendOtp()}>
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
            {/* <TextInput
                label="Enter OTP"
                value={code}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setCode(text)}
                keyboardType='numeric'
              /> */}
            <TextInput
              onPressIn={() => setBoxMove(-40)}
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
            <TextInput
              onPressIn={() => setBoxMove(-85)}
              label="Confirm password"
              value={conformPassword}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setConformPassword(text)}
              secureTextEntry={isEnabled2 ? true : false}
              right={
                <TextInput.Icon
                  style={styles.color}
                  onPress={() => setIsEnabled2(!isEnabled2)}
                  icon={isEnabled2 ? 'eye-off' : 'eye'}
                />
              }
            />
            <TouchableOpacity
              onPress={HandleClick}
              style={{
                backgroundColor: 'black',
                width: '57%',
                marginTop: 15,
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
                Change Password
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

export default ChangePassword;

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
