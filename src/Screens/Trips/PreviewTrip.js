import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import Hedder from '../../Componets/Hedder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {format} from 'date-fns';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PreviewTrip = ({navigation, route}) => {
  const {userTripData} = route.params;
  const [Data, setData] = useState({});

  useEffect(() => {
    setData(userTripData);
  }, [userTripData]);

  const handleShareText = async text => {
    try {
      const textToShare = Data?.share_button_text;
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

  return (
    <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'#FFBF00'}
        barStyle={'light-content'}
      />
      <Hedder name={'Trip Preview'} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#fefce8',
        }}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: 20,
            borderRadius: 10,
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <View style={{marginHorizontal: 15, marginVertical: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: Data?.trip_status_text_colour,
                    fontSize: 10,
                    backgroundColor: Data?.trip_status_text_bg,
                    width: 80,
                    textAlign: 'center',
                    borderRadius: 13,
                    paddingVertical: 3,
                  }}>
                  {Data?.trip_status}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 20}}>
                <FontAwesome
                  name={'edit'}
                  color={'black'}
                  size={25}
                  onPress={() =>
                    navigation.navigate('EditForm', {item: userTripData})
                  }
                />
                {userTripData?.download_button_status == 1 && (
                  <MaterialCommunityIcons
                    name={'download'}
                    color={'black'}
                    size={25}
                    // onPress={() =>HanldeDwonload()}
                    onPress={() => Linking.openURL(Data?.download_button_link)}
                  />
                )}
                {userTripData?.share_button_status == 1 && (
                  <Feather
                    name={'share-2'}
                    color={'black'}
                    size={25}
                    onPress={() => handleShareText()}
                  />
                )}
              </View>
            </View>
            <View style={[styles.TextHead, {marginTop: 7}]}>
              <Text style={styles.CommonText}>Trn Number :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.trn_number}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Trip Date:</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.trip_date_display}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Booking ID :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.booking_id}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Vehicle Type :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.vehicle_type}
              </Text>
            </View>

            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Driver Name :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.driver_name}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Vehicle Number :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.vehicle_number}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Client Name :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.client_name}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Company Name :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.company_name}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Pick Up Point:</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.pick_up_point}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Drop Point :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.drop_point}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Visit Places :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.visit_places}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Garage Start Time :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.garage_start_time_display}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Garage Start KM :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.garage_start_km} KM
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Pick Up Start Time :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.pick_up_start_time_display}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Pick Up Start KM :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.pick_up_start_km} KM
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Drop End KM :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.drop_end_km} KM
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Drop End Time :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.drop_end_time_display}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Garage End Time :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.garage_end_time_display}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Garage End KM :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.garage_end_km} KM
              </Text>
            </View>

     
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Number of Days :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.number_of_days}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Number of Nights:</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.number_of_nights}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Permit Toll:</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.permit_toll}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Diesel Amount :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                ₹ {Data?.diesel_amount}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Diesel KM :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.diesel_km} KM
              </Text>
            </View>

            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Garage Total Km :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.garage_total_km} KM
              </Text>
            </View>

            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Garage Total Time :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 13, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.garage_total_time}
              </Text>
            </View>

            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Pick Up Drop Total Km :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.pick_up_drop_total_km} KM
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Pick Up Drop Total Time:</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 13, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.pick_up_drop_total_time}
              </Text>
            </View>

            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Total KM :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.total_km} KM
              </Text>
            </View>
            {
              Data?.other_expense_name &&
              <View style={styles.TextHead}>
              <Text style={styles.CommonText}>{Data?.other_expense_name} :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                ₹ {Data?.other_expense_amount}
              </Text>
            </View>
            }
           
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Night Halt Amount:</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                ₹ {Data?.night_halt_amount}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Driver Bata :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                ₹ {Data?.driver_bata}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Total Bata (To Driver) :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                ₹ {Data?.total_amount}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Customer Amount :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                ₹ {Data?.customer_amount}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Cash Or Credit :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.cash_or_credit}
              </Text>
            </View>
            <View style={styles.TextHead}>
              <Text style={styles.CommonText}>Cash Or Credit Reason :</Text>
              <Text
                style={[
                  styles.CommonText,
                  {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                ]}>
                {Data?.cash_or_credit_reason}
              </Text>
            </View>
          </View>
        </View>
        {/* <Text style={styles.CommonText}>
              Driver Bata Per KM : {userTripData?.driver_bata_per_km}
            </Text> */}
        {/* <Text style={styles.CommonText}>
              Pick up Drop Text: {userTripData?.pick_up_drop_text}
            </Text> */}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default PreviewTrip;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  CommonText: {
    color: 'white',
    fontSize: 13,
    fontFamily: FONTS.FontRobotoRegular,
    flexShrink: 1,
    // marginBottom: 5,
  },
  TextHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#155e75',
    padding: 10,
    borderRadius: 7,
    elevation: 4,
    marginBottom: 12,
  },
});
