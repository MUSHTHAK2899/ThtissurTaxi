import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Hedder from '../../Componets/Hedder';
import ImagePicker from 'react-native-image-crop-picker';
import {FONTS} from '../../Constants/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-paper';
import Display from '../../utils/Display';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingMoadal from '../../Componets/LoadingMoadal';
import {useToast} from 'react-native-toast-notifications';

const Account = ({navigation}) => {
  const toast = useToast();
  const [proPic, setProPic] = useState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLoginData, setUserLoginData] = useState({});

  useEffect(() => {
    setEmail(userLoginData?.email);
    setPhone(userLoginData?.mobile_number);
    setName(userLoginData?.name);
  }, [userLoginData]);

  const HandleImage = () => {
    toast.hideAll();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperToolbarTitle: 'Crop your image',
      cropperToolbarColor: '#FFBF00',
      cropperActiveWidgetColor: '#FFBF00',
      cropperStatusBarColor: '#FFBF00',
      cropperToolbarWidgetColor: 'white',
    }).then(async image => {
      console.log('image console picker>', image);
      setProPic(image);
      const data = new FormData();
      data.append('image', {
        name: 'aa.jpg',
        type: image?.mime,
        uri: image?.path,
      });

      const res = await Api.UpdateProfilePic(data).catch(err => {
        console.log('api error response', err);
        toast.show(`${err?.response?.data?.message}`, {
          type: 'danger',
        });
      });
      if (res.data && res.data.status) {
        setUserLoginData(res?.data?.data?.user_data);
        // console.log(
        //   'response ProfileEdit  ======> ',
        //   res?.data?.data?.user_data,
        // );
        AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(res?.data?.data?.user_data),
        );
        toast.show(`${res.data?.message}`, {
          type: 'success',
        });
      }
    });
  };

  const HandleLogoutAccount = id => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Logout this Account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'LogOut',
          style: 'destructive',
          onPress: () => {
            HandleLogOut();
          },
        },
      ],
      {cancelable: true},
    );
  };

  const HandleLogOut = async () => {
    toast.hideAll();
    setLoading(true);
    const res = await Api.Logout({}).catch(err => {
      setLoading(false);
      // console.log(err);
    });
    if (res.data) {
      setLoading(false);
      // console.log(res.data?.data);
      AsyncStorage.clear();
      AsyncStorage.removeItem('userDetails');
      // console.log('logout', res.data);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      toast.show(`${res.data?.message}`, {
        type: 'success',
      });
    }
  };

  const userDetails = async () => {
    var accessuser = await AsyncStorage.getItem('userDetails');
    const acyncType = JSON.parse(accessuser);
    setUserLoginData(acyncType);
    // console.log(acyncType);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userDetails();
    });
    return unsubscribe;
  }, [navigation]);

  const HandleProfileUpdate = async () => {
    toast.hideAll();
    setLoading(true);
    const res = await Api.UpdateProfile({
      name: name,
      mobile_number: phone,
    }).catch(err => {
      setLoading(false);
      // console.log(err);
      toast.show(`${err?.message}`, {
        type: 'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      // console.log('login res', res?.data?.data?.user_data);
      setUserLoginData(res?.data?.data?.user_data);
      AsyncStorage.setItem(
        'userDetails',
        JSON.stringify(res?.data?.data?.user_data),
      );
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
<<<<<<< HEAD
    <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
    <SafeAreaView style={styles.safeAreaContainer} />
    <StatusBar
      translucent
      backgroundColor={'#FFBF00'}
      barStyle={'light-content'}
    />
  <View style={{flex:1,backgroundColor:'white'}}>
=======
    <>
      <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
        <SafeAreaView style={styles.safeAreaContainer} />
        <StatusBar
          translucent
          backgroundColor={'#FFBF00'}
          barStyle={'light-content'}
        />
        <Hedder name={'MY Account'} navigation={navigation} />
        <View style={{flex: 1, backgroundColor: '#fefce8'}}>
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              padding: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={HandleLogoutAccount}
              style={
                {
                  // flexDirection: 'row',
                  // justifyContent: 'flex-end',
                  // marginHorizontal: 30,
                  // marginTop: 15,
                }
              }>
              <MaterialCommunityIcons
                name={'log-out'}
                color={'black'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageHedder}>
            <TouchableOpacity
              onPress={HandleImage}
              style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{uri: userLoginData?.profile_image_original}}
              />
            </TouchableOpacity>
>>>>>>> 17f6a46929cbd805c6990ea179c2a2438be8a5ec

            <TouchableOpacity onPress={HandleImage}>
              <Text style={styles.changeImageText}>CHANGE IMAGE</Text>
            </TouchableOpacity>
            <View style={{width: '90%'}}>
              <TextInput
                label="Name"
                value={name}
                style={styles.valueText}
                activeOutlineColor={'black'}
                autoCorrect={false}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setName(text)}
              />
              <TextInput
                label="Mobile Number"
                value={phone}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                autoCorrect={false}
                spellCheck={false}
                onChangeText={text => setPhone(text)}
                maxLength={10}
                keyboardType="number-pad"
              />
              <TextInput
                label="Email"
                value={email}
                style={styles.valueText}
                activeOutlineColor={'black'}
                mode="outlined"
                outlineColor={'black'}
                onChangeText={text => setEmail(text)}
                autoCorrect={false}
                editable={false}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: Display.setHeight(10),
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                gap: 2,
              }}>
              <TouchableOpacity
                onPress={HandleProfileUpdate}
                style={[styles.buttonView, {backgroundColor: '#28a745'}]}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonView, {backgroundColor: '#134e4a'}]}
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaProvider>
      {loading && <LoadingMoadal />}
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    width: 105,
    height: 105,
    borderRadius: 52,
  },
  imageHedder: {
    alignItems: 'center',
    // marginTop: 25,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 52,
  },
  changeImageText: {
    color: 'red',
    marginTop: 25,
    fontFamily: FONTS.FontRobotoMedium,
    fontSize: 16,
  },
  valueText: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: '#fefce8',
    fontSize: 16,
    marginTop: 10,
  },
  buttonView: {
    borderRadius: 100,
    backgroundColor: '#FFBF00',
    // marginHorizontal: 16,
    marginBottom: 13,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(44),
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.FontRobotoRegular,
  },
});
