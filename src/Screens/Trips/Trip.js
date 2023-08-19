import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Share,
  ActivityIndicator,
  PermissionsAndroid,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Hedder from '../../Componets/Hedder';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DriveLIst} from '../../Componets/DummyData';
import {FONTS} from '../../Constants/Constants';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingMoadal from '../../Componets/LoadingMoadal';
import Display from '../../utils/Display';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToast} from 'react-native-toast-notifications';
import RNFetchBlob from 'rn-fetch-blob';
import {format} from 'date-fns';
import Toast from 'react-native-root-toast';

const Trip = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [userLoginData, setUserLoginData] = useState({});
  const [userTripData, setUserTripData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleShareText = async text => {
    try {
      const textToShare = text;
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
    const res = await Api.AdminDeleteTrip({trip_id: id}).catch(err => {
      setLoading(false);
      // console.log(err);
      toast.show(`${err?.message}`, {
        type: 'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      const newDataArray = userTripData.filter(item => item?.trip_id !== id);
      setUserTripData(newDataArray);
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
  const GetTripsFirst = async () => {
    setIsLoading(true);
    const res = await Api.GetTrips(1).catch(err => {
      setIsLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setIsLoading(false);
      // console.log('GetTrips res', res);
      setUserTripData(res?.data?.data?.trips);
      setTotalPages(res?.data?.data?.meta?.total_pages);
    } else {
      // console.log('GetTrips res 2', res);
      setIsLoading(false);
    }
  };
  const GetTrips = async () => {
    setIsLoading(true);
    const res = await Api.GetTrips(currentPage).catch(err => {
      setIsLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setIsLoading(false);
      // console.log('GetTrips res', res);
      setUserTripData(prevData => [...prevData, ...res?.data?.data?.trips]);
      setTotalPages(res?.data?.data?.meta?.total_pages);
    } else {
      // console.log('GetTrips res 2', res);
      setIsLoading(false);
    }
  };

  const onEndReachedEnd = () => {
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
      GetTrips();
    }
  }, [currentPage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      var accessuser = await AsyncStorage.getItem('userDetails');
      const acyncType = JSON.parse(accessuser);
      setUserLoginData(acyncType);
      GetTripsFirst();
      setCurrentPage(1);
      // scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
    });
    return unsubscribe;
  }, [navigation]);

  const HanldeDwonload = item => {
    const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';

    if (Platform.OS === 'android') {
      getDownloadPermissionAndroid()
        .then(granted => {
          if (granted) {
            downloadFile(item);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
          }
        })
        .catch(err => {
          // console.log(err);
        });
    } else {
      downloadFile(item).then(res => {
        RNFetchBlob.ios.previewDocument(res.path());
      });
    }
  };

  const getDownloadPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Download Permission',
          message: 'Your permission is required to save Files to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
    } catch (err) {
      // console.log('err', err);
    }
  };

  const downloadFile = async url => {
    // Get the app's cache directory
    const {config, fs} = RNFetchBlob;
    const cacheDir = fs.dirs.DownloadDir;

    // Generate a unique filename for the downloaded image
    const filename = url.split('/').pop();
    const imagePath = `${cacheDir}/${filename}`;

    try {
      // Download the file and save it to the cache directory
      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
        },
        android: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path: imagePath,
            description: 'File',
          },
        },
      });

      const response = await RNFetchBlob.config(configOptions).fetch(
        'GET',
        url,
      );

      // Return the path to the downloaded file
      return response;
    } catch (error) {
      // console.error("error",error);
      return null;
    }
  };

  const OnDriveList = ({item}) => {
    return (
      <>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 10,
          }}>
          <View style={{marginHorizontal: 10, marginVertical: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text
                style={{
                  color: item?.trip_status_text_colour,
                  fontSize: 10,
                  backgroundColor: item?.trip_status_text_bg,
                  width: 80,
                  textAlign: 'center',
                  borderRadius: 13,
                  paddingVertical: 3,
                }}>
                {item?.trip_status}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  fontFamily: FONTS.FontRobotoRegular,
                }}>
                {format(new Date(item?.trip_date), 'dd-MM-yyyy')}
              </Text>
            </View>
            <Text
              style={{
                color: '#2F9B41',
                fontSize: 17,
                fontFamily: FONTS.FontRobotoBold,
                marginVertical: 4,
              }}>
              Driver : {item?.driver_name}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: FONTS.FontRobotoMedium,
                marginVertical: 1,
              }}>
              Client : {item?.client_name} ({item?.company_name})
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: FONTS.FontRobotoRegular,
              }}>
              {item?.pick_up_drop_text}
            </Text>
            <View style={{flexDirection: 'row', gap: 20}}>
              <Text
                style={{
                  color: '#FFBF00',
                  fontSize: 17,
                  fontFamily: FONTS.FontRobotoBold,
                  marginVertical: 4,
                }}>
                Total Amount: ₹ {item?.total_amount}
              </Text>
              {/* <Text
                style={{
                  color: '#2F9B41',
                  fontSize: 17,
                  fontFamily: FONTS.FontRobotoBold,
                  marginVertical: 4,
                }}>
                ₹ {item?.night_halt_amount}
              </Text> */}
            </View>
            {userLoginData?.user_type == 'DriverAdmin' && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignSelf: 'center',
                  gap: 11,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() =>
                    navigation.navigate('PreviewTrip', {
                      userTripData: item,
                      handleShareText: () =>
                        handleShareText(item?.share_button_text),
                      HanldeDwonload: () =>
                        HanldeDwonload(item?.download_button_link),
                    })
                  }>
                  <MaterialIcons name={'eye'} color={'white'} size={25} />
                </TouchableOpacity>
                {item?.share_button_status == 1 && (
                  <TouchableOpacity
                    style={[styles.buttonView]}
                    onPress={() => handleShareText(item?.share_button_text)}>
                    <Feather name={'share-2'} color={'white'} size={25} />
                  </TouchableOpacity>
                )}
                {item?.download_button_status == 1 && (
                  <TouchableOpacity style={styles.buttonView}>
                    <MaterialCommunityIcons
                      name={'download'}
                      color={'white'}
                      size={25}
                      // onPress={() => HanldeDwonload(item?.download_button_link)}
                      onPress={() => Linking.openURL(item?.download_button_link)}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() => navigation.navigate('EditForm', {item: item})}>
                  <FontAwesome name={'edit'} color={'white'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() => HandleDelete(item?.trip_id)}>
                  <MaterialCommunityIcons
                    name={'delete'}
                    color={'white'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </>
    );
  };

  const ListEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Display.setHeight(35),
        }}>
        <Text
          style={{
            color: 'gray',
            fontSize: 20,
            fontFamily: FONTS.FontRobotoMedium,
            marginBottom: 50,
          }}>
          No data found !
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
        <SafeAreaView style={styles.safeAreaContainer} />
        <StatusBar
          translucent
          backgroundColor={'#FFBF00'}
          barStyle={'light-content'}
        />
        <Hedder name={'MY Trips'} navigation={navigation} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fefce8',
            marginTop: 20,
          }}>
          <FlatList
          ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            data={userTripData}
            ListEmptyComponent={ListEmpty}
            renderItem={OnDriveList}
            keyExtractor={(item, index) => {
              return index;
            }}
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
        {loading && <LoadingMoadal />}
        <Toast
          visible={toastVisible}
          position={Toast.positions.BOTTOM} // Adjust the position (50 = 50% from the bottom)
          shadow={false}
          animation={true}
          hideOnPress={true}>
          Dwonloading...
        </Toast>
      </SafeAreaProvider>
    </>
  );
};

export default React.memo(Trip);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonView: {
    borderRadius: 10,
    backgroundColor: '#134e4a',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(14),
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: FONTS.FontRobotoMedium,
  },
});
