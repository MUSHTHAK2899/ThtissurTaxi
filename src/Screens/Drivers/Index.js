import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Hedder from '../../Componets/Hedder';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DriveLIst} from '../../Componets/DummyData';
import {FONTS} from '../../Constants/Constants';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import LoadingMoadal from '../../Componets/LoadingMoadal';
import Display from '../../utils/Display';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import Toast from 'react-native-root-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import AddDriverModal from '../../Componets/AddDriverModal';

const Drivers = ({navigation}) => {
  const toast = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoginData, setUserLoginData] = useState({});
  const [AdminDriverData, setAdminDriverData] = useState({});
  const [toastVisible, setToastVisible] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [DriversList, setDriversList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisibleDriver, setIsModalVisibleDriver] = useState(false);

  //modal
  const [AddDriverName, setAddDriverName] = useState('');
  const [email, setEmail] = useState(DriveLIst?.email);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'verified', value: 1},
    {label: 'Not Verified', value: 0},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Active', value: 1},
    {label: 'Not Active', value: 0},
  ]);
  const [ModalTitle, setModalTitle] = useState('');
  const [ModalButtonText, setModalButtonText] = useState('');
  const [DriverId, setDriverID] = useState();

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  const GetDriversFirst = async () => {
    setIsLoading(true);
    const res = await Api.GetDrivers(1).catch(err => {
      setIsLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setIsLoading(false);
      // console.log('GetDrivers res', res);
      setDriversList(res?.data?.data?.drivers);
      setTotalPages(res?.data?.data?.meta?.total_pages);
    } else {
      // console.log('GetDrivers res 2', res);
      setIsLoading(false);
    }
  };

  const GetDrivers = async () => {
    setIsLoading(true);
    const res = await Api.GetDrivers(currentPage).catch(err => {
      setIsLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setIsLoading(false);
      // console.log('GetDrivers res', res);
      setDriversList(prevData => [...prevData, ...res?.data?.data?.drivers]);
      setTotalPages(res?.data?.data?.meta?.total_pages);
    } else {
      // console.log('GetDrivers res 2', res);
      setIsLoading(false);
    }
  };

  const onEndReachedEnd = () => {
    // console.log('curent', currentPage);
    if (!isLoading) {
      if (currentPage == totalPages) {
        // console.log('pages is equal reached');
      } else {
        setCurrentPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (currentPage == 1) {
    } else {
      GetDrivers();
    }
  }, [currentPage]);

  const HandleDriverCode = async () => {
    setLoading(true);
    const res = await Api.GetDriverCode().catch(err => {
      setLoading(false);
      // console.log('HandleDriverCode', err);
    });
    if (res.data) {
      setLoading(false);
      setIsModalVisible(true);
      setAdminDriverData(res?.data?.data);
      // console.log('HandleDriverCode', res.data.data);
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
      setCurrentPage(1);
      GetDriversFirst();
    });
    return unsubscribe;
  }, [navigation]);

  const handleCopyToClipboard = () => {
    setIsModalVisible(false);
    Clipboard.setString(AdminDriverData?.android_message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleShareText = async () => {
    try {
      const textToShare = AdminDriverData?.android_message;
      const result = await Share.share({
        message: textToShare,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log(
          //   `Shared successfully to activity: ${result.activityType}`,
          // );
        } else {
          // console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share dismissed!');
      }
    } catch (error) {
      // console.error('Error sharing:', error.message);
    }
  };

  const HandleDelete = id => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this Trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            handleDeleteApi(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleDeleteApi = async id => {
    toast.hideAll();
    setLoading(true);
    const res = await Api.DeleteDriver({driver_id: id}).catch(err => {
      setLoading(false);
      // console.log(err);
      toast.show(`${err?.message}`, {
        type: 'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      const newDataArray = DriversList.filter(item => item?.driver_id !== id);
      setDriversList(newDataArray);
      // console.log('AdminDeleteTrip res', res);
      toast.show(`${res.data?.message}`, {
        type: 'success',
      });
    } else {
      setLoading(false);
      // console.log('AdminDeleteTrip res 2', res);
      toast.show(`${res.data?.message}`, {
        type: 'warning',
      });
    }
  };

  const HandleAddUser = async () => {
    toast.hideAll();
    setLoading(true);
    const res = await Api.AddDriver({
      name: AddDriverName,
      email: email,
      mobile_number: mobileNumber,
      password: password,
      verify_status: value,
      account_status: value1,
    }).catch(err => {
      setLoading(false);
      // console.log(err);
      toast.show(`${err?.message}`, {
        type: 'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setDriversList([]);
      GetDriversFirst();
      setCurrentPage(1);
      setIsModalVisibleDriver(false);
      setLoading(false);
      // console.log('AddDriver res', res?.data);
      toast.show(`${res.data?.message}`, {
        type: 'success',
      });
    } else {
      setLoading(false);
      // console.log('AddDriver res 2', res.data);
      toast.show(`${res.data?.message}`, {
        type: 'warning',
      });
    }
  };

  const HandleEditDriver = item => {
    setDriverID(item?.driver_id);
    setAddDriverName(item?.name);
    setEmail(item?.email);
    setMobileNumber(item?.mobile_number);
    setIsModalVisibleDriver(true);
    setValue(item?.email_verify_status);
    setValue1(item?.account_status);
    setModalTitle('Edit Driver');
    setModalButtonText('Edit Driver');
  };

  const HandleAddDeiver = () => {
    setDriverID();
    setValue();
    setValue1();
    setAddDriverName('');
    setPassword('')
    setEmail('');
    setMobileNumber('');
    setIsModalVisibleDriver(true);
    setModalTitle('Add New Driver');
    setModalButtonText('Add Driver');
  };

  const AdminUpdateDriver = async () => {
    toast.hideAll();
    setLoading(true);
    const res = await Api.AdminUpdateDriver({
      driver_id: DriverId,
      name: AddDriverName,
      email: email,
      mobile_number: mobileNumber,
      password: password,
      verify_status: value,
      account_status: value1,
    }).catch(err => {
      setLoading(false);
      // console.log(err);
      toast.show(`${err?.message}`, {
        type: 'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setDriversList([]);
      GetDriversFirst();
      setCurrentPage(1);
      // const NewDriversList =DriversList.map((item)=>{
      //   if(item?.driver_id == DriverId){
      //     return{
      //       ...item,
      //       driver_id: DriverId,
      //       name: AddDriverName,
      //       email: email,
      //       mobile_number: mobileNumber,
      //       password: password,
      //       verify_status: value,
      //       account_status: value1,
      //     }
      //   }
      //    return item
      // })
      //  setDriversList(NewDriversList)
      setIsModalVisibleDriver(false);
      setLoading(false);
      // console.log('AdminUpdateDriver res', res);
      toast.show(`${res.data?.message}`, {
        type: 'success',
      });
    } else {
      setLoading(false);
      // console.log('AdminUpdateDriver res 2', res);
      toast.show(`${res.data?.message}`, {
        type: 'warning',
      });
    }
  };

  const OnDriversList = ({item}) => {
    // console.log('OnDriversList', item);
    return (
      <>
        <View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginBottom: 15,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 10,
            }}>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontFamily: FONTS.FontRobotoRegular,
                  }}>
                  Joined On : {item?.joined_on}
                </Text>
                <Text
                  style={{
                    color: '#134e4a',
                    fontSize: 17,
                    fontFamily: FONTS.FontRobotoBold,
                    marginVertical: 5,
                  }}>
                  {item?.name}
                </Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 13,
                      fontFamily: FONTS.FontRobotoRegular,
                    }}>
                    {item?.email}
                  </Text>
                  <Text
                    style={{
                      color: item?.email_verify_status_text_colour,
                      fontSize: 8,
                      backgroundColor: item?.email_verify_status_text_bg,
                      width: 50,
                      textAlign: 'center',
                      borderRadius: 13,
                      paddingVertical: 3,
                    }}>
                    {item?.email_verify_status_text}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: FONTS.FontRobotoRegular,
                    marginVertical: 5,
                  }}>
                  {item?.mobile_number}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: item?.account_verify_status_text_colour,
                    fontSize: 8,
                    backgroundColor: item?.account_verify_status_text_bg,
                    width: 55,
                    textAlign: 'center',
                    borderRadius: 5,
                    paddingVertical: 3,
                    marginBottom: 10,
                  }}>
                  {item?.account_verify_status_text}
                </Text>
                <View>
                  <Image
                    style={styles.image}
                    source={{uri: item?.profile_image_thumb}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[styles.buttonView]}
                onPress={() =>
                  navigation.navigate('Wallet', {id: item?.driver_id})
                }>
                <FontAwesome name={'money'} color={'white'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonView]}
                onPress={() => HandleEditDriver(item)}>
                <FontAwesome name={'edit'} color={'white'} size={25} />
              </TouchableOpacity>
              {item?.delete_button_status == 1 && (
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() => HandleDelete(item?.driver_id)}>
                  <MaterialCommunityIcons
                    name={'delete'}
                    color={'white'}
                    size={25}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
        <SafeAreaView style={styles.safeAreaContainer} />
        <FocusAwareStatusBar
          translucent
          backgroundColor={'#FFBF00'}
          barStyle={'light-content'}
        />
        <Hedder name={'Drivers'} navigation={navigation} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fefce8',
            marginTop: 20,
            marginBottom: Display.setHeight(4),
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginHorizontal: 30,
                gap: 30,
              }}>
              <TouchableOpacity onPress={HandleAddDeiver}>
                <MaterialIcons
                  name={'my-library-add'}
                  color={'black'}
                  size={30}
                />
              </TouchableOpacity>
              {userLoginData?.user_type == 'DriverAdmin' && (
                <TouchableOpacity onPress={HandleDriverCode}>
                  <Feather name={'share-2'} color={'black'} size={25} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DriversList}
              renderItem={OnDriversList}
              keyExtractor={(item, index) => item?.driver_id}
              onEndReached={onEndReachedEnd}
              onEndReachedThreshold={1}
              ListFooterComponent={
                isLoading ? (
                  <View style={{marginBottom: 40}}>
                    <ActivityIndicator size="small" />
                  </View>
                ) : null
              }
            />
          </View>
        </View>
      </SafeAreaProvider>
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => setIsModalVisible(false)}
          style={{justifyContent: 'center'}}
          animationType="fade">
          <View style={styles.container}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', gap: 15}}
                onPress={handleCopyToClipboard}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: FONTS.FontRobotoBold,
                    fontSize: 18,
                  }}>
                  {AdminDriverData?.driver_code}
                </Text>
                <FontAwesome5 name={'copy'} color={'black'} size={25} />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FONTS.FontRobotoRegular,
                  fontSize: 14,
                  marginTop: 20,
                }}>
                Share This Code To Drivers
              </Text>
              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={handleShareText}>
                <Feather name={'share-2'} color={'black'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {loading && <LoadingMoadal />}
      <Toast
        visible={toastVisible}
        position={Toast.positions.BOTTOM} // Adjust the position (50 = 50% from the bottom)
        shadow={false}
        animation={true}
        hideOnPress={true}>
        Text copied to clipboard!
      </Toast>

      <AddDriverModal
        isVisible={isModalVisibleDriver}
        onBackdropPress={() => setIsModalVisibleDriver(false)}
        onclose={setIsModalVisibleDriver}
        loading={loading}
        HandleAddUser={HandleAddUser}
        AddDriverName={AddDriverName}
        setAddDriverName={setAddDriverName}
        email={email}
        setEmail={setEmail}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        password={password}
        setPassword={setPassword}
        open={open}
        open1={open1}
        setOpen={setOpen}
        setOpen1={setOpen1}
        value={value}
        value1={value1}
        items={items}
        items1={items1}
        setItems={setItems}
        setItems1={setItems1}
        setValue={setValue}
        setValue1={setValue1}
        ModalTitle={ModalTitle}
        ModalButtonText={ModalButtonText}
        AdminUpdateDriver={AdminUpdateDriver}
      />
    </>
  );
};

export default Drivers;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: 'white',
    height: Display.setHeight(25),
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Display.setWidth(18),
    height: Display.setHeight(9),
    borderRadius: 100,
  },
  buttonView: {
    borderRadius: 10,
    backgroundColor: '#134e4a',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(24),
  },
});
