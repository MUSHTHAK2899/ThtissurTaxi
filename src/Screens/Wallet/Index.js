import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Hedder from '../../Componets/Hedder';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DriveLIst} from '../../Componets/DummyData';
import {FONTS} from '../../Constants/Constants';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import LoadingMoadal from '../../Componets/LoadingMoadal';
import Display from '../../utils/Display';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddWalletTransation from '../../Componets/AddWalletTeansation';
import {format} from 'date-fns';

const Drivers = ({navigation, route}) => {
  const toast = useToast();
  const {id} = route.params;
  // console.log(id);
  const [userLoginData, setUserLoginData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [WalletData, setWalletData] = useState([]);
  const [WalletSummary, setWalletSummary] = useState({});
  const [amount, setAmount] = useState()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Credit');
  const [items, setItems] = useState([
    {label: 'Credit', value: 'Credit'},
    {label: 'Debit', value: 'Debit'},
  ]);
  const [DisCription, setDisCription] = useState('')
  const [TransactionDate, setTransactionDate] = useState(
    new Date(),
  );
  const [showPicker, setShowPicker] = useState(false);
  const [TransactionTime, setTransactionTime] = useState(
    new Date(),
  );
  const [showPickerTime, setShowPickerTime] = useState(false);

  const handleDateChange = (event, date) => {
    if (event.type == 'set') {
      setShowPicker(false);
      if (date) {
        setTransactionDate(date);
      }
    } else {
      setShowPicker(false);
    }
  };
  const handleTimeChange = (event, date) => {
    if (event.type == 'set') {
      setShowPickerTime(false);
      if (date) {
        setTransactionTime(date);
      }
    } else {
      setShowPickerTime(false);
    }
  };
  const TransactionDateTime = format(TransactionDate, 'yyyy-MM-dd').concat(
    ' ',
     format(TransactionTime, 'HH:mm:ss'),
  );

  const userDetails = async () => {
    var accessuser = await AsyncStorage.getItem('userDetails');
    const acyncType = JSON.parse(accessuser);
    setUserLoginData(acyncType);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userDetails();
      GetMyWalletFirst()
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    if (currentPage == 1) {
    } else {
    GetMyWallet()
    }
  },[currentPage])

  const GetMyWalletFirst = async () => {
    setIsLoading(true);
    const res = await Api.GetMyWallet(1, id).catch(err => {
      setIsLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setIsLoading(false);
      // console.log('GetMyWallet res', res);
      setWalletData(res?.data?.data?.transactions );
      setWalletSummary(res?.data?.data?.transaction_summary);
      setTotalPages(res?.data?.data?.meta?.total_pages);
    } else {
      // console.log('GetMyWallet res 2', res);
      setIsLoading(false);
    }
  };
  const GetMyWallet = async () => {
    setIsLoading(true);
    const res = await Api.GetMyWallet(currentPage, id).catch(err => {
      setIsLoading(false);
      // console.log(err);
    });
    if (res.data && res.data.status == 200) {
      setIsLoading(false);
      // console.log('GetMyWallet res', res);
      setWalletData(prevData => [
        ...prevData,
        ...res?.data?.data?.transactions,
      ]);
      setWalletSummary(res?.data?.data?.transaction_summary);
      setTotalPages(res?.data?.data?.meta?.total_pages);
    } else {
      // console.log('GetMyWallet res 2', res);
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

  const HandleTransaction = async () => {
    toast.hideAll()
    // console.log("TransactionDateTime",TransactionDateTime,id,amount,value,DisCription)
    setLoading(true);
      const res = await Api.AdminMakeTransaction({
        driver_id:id,
        amount:amount,
        account_type:value,
        transaction_on:TransactionDateTime,
        description:DisCription
      }).catch(err => {
        setLoading(false);
        // console.log(err);
        toast.show( `${err?.message}`,{
          type:'danger',
        });
      });
      if (res.data && res.data.status == 200) {
        setAmount('')
        setDisCription('')
        setIsModalVisible(false)
        setWalletData([]);
        GetMyWalletFirst()
        setCurrentPage(1);
        setLoading(false);
        // console.log('AddDriver res', res?.data);
        toast.show( `${res.data?.message}`,{
          type:'success',
        });
      } else {
        setLoading(false);
        // console.log('AddDriver res 2', res.data);
        toast.show( `${res.data?.message}`,{
          type:'warning',
        });
      }
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: 20,
            backgroundColor: '#fde68a',
            borderRadius: 15,
            elevation: 10,
          }}>
          <View style={{marginHorizontal: 15, marginVertical: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FONTS.FontRobotoMedium,
                  fontSize: 16,
                }}>
                <Text style={{color: 'black'}}>Completed Trips</Text> :{' '}
                {WalletSummary?.completed_trips_count}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FONTS.FontRobotoMedium,
                  fontSize: 16,
                }}>
                <Text style={{color: 'black'}}>Approved Trips </Text>:{' '}
                {WalletSummary?.approved_trips_count}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.FontRobotoMedium,
                fontSize: 25,
                textAlign: 'center',
                marginTop: 14,
              }}>
              {WalletSummary?.driver_name}
            </Text>
            <Text
              style={{
                color: WalletSummary?.wallet_amount_colour,
                fontFamily: FONTS.FontRobotoBold,
                fontSize: 25,
                textAlign: 'center',
                marginTop: 10,
              }}>
              ₹ {WalletSummary?.wallet_amount}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FONTS.FontRobotoRegular,
                  fontSize: 13,
                }}>
                <Text style={{color: 'black'}}>Trip Amount</Text> : ₹
                {WalletSummary?.trips_amount}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FONTS.FontRobotoRegular,
                  fontSize: 13,
                }}>
                <Text style={{color: 'black'}}>Amount Recived </Text>: ₹
                {WalletSummary?.received_amount}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  const OnWalletList = ({item}) => {
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
          <View style={{marginHorizontal: 15, marginVertical: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: FONTS.FontRobotoRegular,
                  }}>
                 { format(new Date(item?.transaction_on), 'dd-MM-yyyy  h:mm a')}
                  {}
                </Text>
                <Text
                  style={{
                    color: '#f59e0b',
                    fontSize: 20,
                    fontFamily: FONTS.FontRobotoBold,
                  }}>
                  ₹ {item?.amount}
                </Text>
                {item?.description == null ? null : (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 13,
                      fontFamily: FONTS.FontRobotoMedium,
                      marginTop: 5,
                    }}>
                    {item?.description}
                  </Text>
                )}
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: FONTS.FontRobotoMedium,
                  }}>
                  {item?.transaction_id}
                </Text>
                <Text
                  style={{
                    color: item?.colour,
                    fontSize: 20,
                    fontFamily: FONTS.FontRobotoBold,
                    textAlign: 'right',
                  }}>
                  {item?.account_type}
                </Text>
              </View>
            </View>
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
          marginTop: 50,
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
        <Hedder name={'My Wallet'} navigation={navigation} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fefce8',
            marginTop: 20,
            marginBottom:
              userLoginData?.user_type == 'DriverAdmin'
                ? Display.setHeight(4)
                : 0,
          }}>
          {userLoginData?.user_type == 'DriverAdmin' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 30,
                gap: 40,
                marginBottom: 10,
              }}>
              <TouchableOpacity onPress={()=>{setIsModalVisible(true),setTransactionDate(new Date()),setTransactionTime(new Date())}}>
                <MaterialIcons
                  name={'my-library-add'}
                  color={'black'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={{marginTop: 1, marginBottom: 14}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={ListHeaderComponent}
              data={WalletData}
              renderItem={OnWalletList}
              keyExtractor={(item, index) => {
                return index;
              }}
              onEndReached={onEndReachedEnd}
              ListEmpty={ListEmpty}
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
      <AddWalletTransation
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        onclose={setIsModalVisible}
        amount={amount}
        setAmount={setAmount}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
        DisCription={DisCription}
        setDisCription={setDisCription}
        HandleTransaction={HandleTransaction}
        handleDateChange={handleDateChange}
        handleTimeChange={handleTimeChange}
        TransactionDate={TransactionDate}
        TransactionTime={TransactionTime}
        setShowPicker={setShowPicker}
        showPicker={showPicker}
        setShowPickerTime={setShowPickerTime}
        loading={loading}
        showPickerTime={showPickerTime}
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
});
