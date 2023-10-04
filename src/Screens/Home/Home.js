import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LineChart} from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Image} from 'react-native-elements';
import {useNetInfo} from '@react-native-community/netinfo';

const Home = ({navigation}) => {
  const netInfo = useNetInfo();
  const [userLoginData, setUserLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [graphDataCount, setGraphDataCont] = useState([]);
  const [HomeDatas, setHomeDatas] = useState({});

  const userDetails = async () => {
    var accessuser = await AsyncStorage.getItem('userDetails');
    const acyncType = JSON.parse(accessuser);
    setUserLoginData(acyncType);
    console.log('loginData', acyncType);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userDetails();
      HandleHome();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (netInfo.isConnected) {
      userDetails();
      HandleHome();
    }
  }, [netInfo]);

  const HandleHome = async () => {
    setLoading(true);
    const res = await Api.GetHomeData().catch(err => {
      setLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      // console.log('GetHomeData res', res);
      const GraphMonth = res?.data?.data?.graph_data.map(item => item?.month);
      setGraphData(GraphMonth);
      setGraphDataCont(res?.data?.data?.graph_data);
      setHomeDatas(res?.data?.data);
    } else {
      setLoading(false);
      // console.log('GetHomeData res 2', res);
    }
  };

  // useEffect(() => {
  //   HandleHome();
  // }, []);

  const data = {
    labels: graphData,
    datasets: [
      {
        data:
          graphDataCount.length === 0
            ? [0, 0, 5]
            : graphDataCount.map(item => {
                return item?.trip_count;
              }),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgb(255, 170, 51), ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const handleGoBack = useCallback(() => {
    BackHandler.exitApp();
    return true; // Returning true from onBackPress denotes that we have handled the event
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleGoBack);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    }, [handleGoBack]),
  );
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <FocusAwareStatusBar
        translucent
        backgroundColor={'#292524'}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../../Assets/LoginPage.png')}
        style={{flex: 1}}
        resizeMode="stretch">
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            {HomeDatas?.banner_image_status == 1 && (
              <Image
                source={{uri: HomeDatas?.banner_images}}
                style={{width: '100%', height: Display.setWidth(20)}}
                resizeMode="stretch"
              />
            )}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                // backgroundColor: '#fefce8',
                marginVertical: 15,
              }}>
              <View style={{marginBottom: 15}}>
                {HomeDatas?.hello_text_status == 1 && (
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: FONTS.FontRobotoMedium,
                      fontSize: 14,
                    }}>
                    {HomeDatas?.hello_text}
                  </Text>
                )}
              </View>
              {HomeDatas?.graph_status == 1 && (
                <LineChart
                  data={data}
                  width={Display.setWidth(90)}
                  height={
                    userLoginData?.user_type == 'DriverAdmin'
                      ? Display.setHeight(32)
                      : Display.setHeight(42)
                  }
                  chartConfig={chartConfig}
                  style={{borderRadius: 15, elevation: 10}}
                  bezier
                />
              )}
              <View style={{marginTop: 20, flexDirection: 'row', gap: 14}}>
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() => navigation.navigate('Drive')}>
                  <MaterialCommunityIcons
                    name={'steering'}
                    color={'black'}
                    size={30}
                  />
                  <Text style={styles.buttonText}>Drive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() => navigation.navigate('My Trips')}>
                  <FontAwesome name={'car'} color={'black'} size={30} />
                  <Text style={styles.buttonText}>My Trips</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() =>
                    navigation.navigate('Wallet', {id: userLoginData?.id})
                  }>
                  <FontAwesome5 name={'wallet'} color={'black'} size={30} />
                  <Text style={styles.buttonText}>My Wallet</Text>
                </TouchableOpacity>
              </View>
              {userLoginData?.user_type == 'DriverAdmin' && (
                <View style={{marginTop: 10, flexDirection: 'row', gap: 17}}>
                  <TouchableOpacity
                    style={[styles.buttonView, {width: Display.setWidth(42)}]}
                    onPress={() => navigation.navigate('Account')}>
                    <MaterialCommunityIcons
                      name={'account'}
                      color={'black'}
                      size={30}
                    />
                    <Text style={styles.buttonText}>My Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonView, {width: Display.setWidth(42)}]}
                    onPress={() => navigation.navigate('Drivers')}>
                    <FontAwesome name={'users'} color={'black'} size={25} />
                    <Text style={styles.buttonText}>Drivers</Text>
                  </TouchableOpacity>
                </View>
              )}
              {userLoginData?.user_type == 'DriverAdmin' ? (
                <View style={{marginTop: 10, flexDirection: 'row', gap: 17}}>
                  <View
                    style={[styles.buttonView, {width: Display.setWidth(42)}]}>
                    <Text style={[styles.buttonText, {fontSize: 17}]}>
                      {HomeDatas?.driver_completed_trips} /{' '}
                      {HomeDatas?.total_completed_trips}
                    </Text>
                    <Text style={styles.buttonText}>Completed Trips</Text>
                  </View>
                  <View
                    style={[styles.buttonView, {width: Display.setWidth(42)}]}>
                    <Text style={[styles.buttonText, {fontSize: 17}]}>
                      {HomeDatas?.driver_approved_trips} /{' '}
                      {HomeDatas?.total_approved_trips}
                    </Text>
                    <Text style={styles.buttonText}>Approved Trips</Text>
                  </View>
                </View>
              ) : (
                <View style={{marginTop: 10, flexDirection: 'row', gap: 17}}>
                  <TouchableOpacity
                    style={[styles.buttonView, {width: Display.setWidth(42)}]}>
                    <Text style={[styles.buttonText, {fontSize: 17}]}>
                      {HomeDatas?.driver_completed_trips}
                    </Text>
                    <Text style={styles.buttonText}>Completed Trips</Text>
                  </TouchableOpacity>
                  <View
                    style={[styles.buttonView, {width: Display.setWidth(42)}]}>
                    <Text style={[styles.buttonText, {fontSize: 17}]}>
                      {HomeDatas?.driver_approved_trips}
                    </Text>
                    <Text style={styles.buttonText}>Approved Trips</Text>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
      </ImageBackground>
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonView: {
    borderRadius: 10,
    backgroundColor: 'white',
    height: Display.setHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(27),
    elevation: 10,
  },
  headerName: {
    fontFamily: FONTS.FontRobotoBold,
    fontSize: 18,
    color: 'white',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS.FontRobotoMedium,
    marginTop: 2,
  },
});
