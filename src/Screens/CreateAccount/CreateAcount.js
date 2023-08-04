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
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import LoadingMoadal from '../../Componets/LoadingMoadal';

const CreateAcount = ({navigation}) => {
  const toast = useToast();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [BoxMove, setBoxMove] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [loading, setLoading] = useState(false)

  const HandleClick = async () => {
    toast.hideAll()
    setLoading(true);
    if (!email || !password || !code ||  !phone || !conformPassword || !name) {
      setLoading(false);
      toast.show("The some fields are required",{
        type:'danger',
      });
    } else {
      const res = await Api.Register({
        driver_code:code,
        name:name,
        email:email,
        password:password,
        password_confirmation:conformPassword,
        mobile_number:phone

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
        AsyncStorage.setItem('userAccessToken', res?.data?.data?.user_data?.token);
        AsyncStorage.setItem('userDetails', JSON.stringify(res?.data?.data?.user_data));
        toast.show( `${res.data?.message}`,{
          type:'success',
        });
        navigation.navigate('Otp', {Data:res?.data?.data?.user_data});
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
    <>
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
              height: Display.setHeight(78),
              marginTop: Display.setHeight(3),
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
                Create Acount
              </Text>
              <TextInput
               onPressIn={() => setBoxMove(0)}
                label="Driver Code"
                value={code}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setCode(text)}
              />
              <TextInput
               onPressIn={() => setBoxMove(0)}
                label="Email"
                value={email}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                onPressIn={() => setBoxMove(-20)}
                label="Name"
                value={name}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setName(text)}
              />
              <TextInput
                onPressIn={() => setBoxMove(-40)}
                label="Mobile Number"
                value={phone}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setPhone(text)}
                maxLength={10}
                keyboardType='phone-pad'
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
                onPressIn={() => setBoxMove(-127)}
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={HandleClick}
                  style={{
                    backgroundColor: 'black',
                    width: '40%',
                    marginTop: 14,
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
                    Register
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
                  style={{marginRight: 30}}
                  onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: FONTS.FontRobotoMedium,
                      fontSize: 16,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        </ImageBackground>
        {
        loading &&
        <LoadingMoadal/>
      }
      </SafeAreaProvider>
    </>
  );
};

export default CreateAcount;

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
