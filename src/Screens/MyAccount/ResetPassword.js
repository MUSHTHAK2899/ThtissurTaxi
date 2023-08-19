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
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import Hedder from '../../Componets/Hedder';
import {TextInput} from 'react-native-paper';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import LoadingMoadal from '../../Componets/LoadingMoadal';

const ResetPassword = ({navigation}) => {
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [loading, setLoading] = useState(false);

  const HandleProfileUpdate = async () => {
    toast.hideAll()
    setLoading(true);
    if(!oldPassword || !password || !conformPassword){
      setLoading(false);
      toast.show("The fields are required",{
        type:'danger',
      });
    }else{
      const res = await Api.ChangePassword({
        current_password: oldPassword,
        password: password,
        password_confirmation: conformPassword
      }).catch(err => {
        setLoading(false);
        // console.log(err);
        toast.show( `${err?.message}`,{
          type:'danger',
        });
      });
      if (res.data && res.data.status == 200) {
        setLoading(false);
        navigation.navigate('Account')
        // console.log('login res', res?.data);
        toast.show( `${res.data?.message}`,{
          type:'success',
        });
        
      } else {
        setLoading(false);
        // console.log('login res 2', res.data);
        toast.show( `${res.data?.message}`,{
          type:'warning',
        });
      }
    }
  };

  return (
    <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'#FFBF00'}
        barStyle={'light-content'}
      />
      <Hedder name={'Reset Password'} navigation={navigation} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fefce8',
        }}>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
          <TextInput
            label=" Old Password"
            value={oldPassword}
            style={styles.valueText}
            activeOutlineColor={'black'}
            mode="outlined"
            outlineColor={'black'}
            onChangeText={text => setOldPassword(text)}
          />
          <TextInput
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
        </View>
        <TouchableOpacity onPress={HandleProfileUpdate}
          style={[styles.buttonView, {backgroundColor: '#28a745'}]}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingMoadal />}
    </SafeAreaProvider>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  valueText: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: '#fefce8',
    fontSize: 16,
    width: '100%',
    marginTop: 15,
  },
  buttonView: {
    borderRadius: 100,
    backgroundColor: '#FFBF00',
    // marginHorizontal: 16,
    marginBottom: 13,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(90),
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.FontRobotoRegular,
  },
});
