import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import Hedder from '../../Componets/Hedder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {format} from 'date-fns';

const PreviewTrip = ({navigation, route}) => {
  const {userTripData, handleShareText,HanldeDwonload} = route.params;

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
                    color: userTripData?.trip_status_text_colour,
                    fontSize: 10,
                    backgroundColor: userTripData?.trip_status_text_bg,
                    width: 80,
                    textAlign: 'center',
                    borderRadius: 13,
                    paddingVertical: 3,
                  }}>
                  {userTripData?.trip_status}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 20}}>
                {userTripData?.download_button_status == 1 && (
                  <MaterialCommunityIcons
                    name={'download'}
                    color={'black'}
                    size={25}
                    // onPress={() =>HanldeDwonload()}
                    onPress={() => Linking.openURL(userTripData?.download_button_link)}
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
            <Text style={styles.CommonText}>
              Trn Number : {userTripData?.trn_number}
            </Text>
            <Text style={styles.CommonText}>
              Booking ID : {userTripData?.booking_id}
            </Text>
            <Text style={styles.CommonText}>
              Vehicle Type : {userTripData?.vehicle_type}
            </Text>
            <Text style={styles.CommonText}>
              Driver Name : {userTripData?.driver_name}
            </Text>
            <Text style={styles.CommonText}>
              Vehicle Number : {userTripData?.vehicle_number}
            </Text>
            <Text style={styles.CommonText}>
              Client Name : {userTripData?.client_name}
            </Text>
            <Text style={styles.CommonText}>
              Company Name : {userTripData?.company_name}
            </Text>
            <Text style={styles.CommonText}>
              Pick up Point: {userTripData?.pick_up_point}
            </Text>
            <Text style={styles.CommonText}>
              Drop Point : {userTripData?.drop_point}
            </Text>
            <Text style={styles.CommonText}>
              Visit Places : {userTripData?.visit_places}
            </Text>
            <Text style={styles.CommonText}>
              Garage Start Date : {format(new Date(userTripData?.garage_start_time), 'dd-MM-yyyy')}
            </Text>
            <Text style={styles.CommonText}>
              Garage Start Time : {format(new Date(userTripData?.garage_start_time), 'h:mm a')}
            </Text>
            <Text style={styles.CommonText}>
              Garage Start KM : {userTripData?.garage_start_km}
            </Text>
            <Text style={styles.CommonText}>
              Pick up Start Date : {format(new Date(userTripData?.pick_up_start_time), 'dd-MM-yyyy')} 
            </Text>
            <Text style={styles.CommonText}>
              Pick up Start Time : {format(new Date(userTripData?.pick_up_start_time), 'h:mm a')} 
            </Text>
            <Text style={styles.CommonText}>
              pick up Start KM : {userTripData?.pick_up_start_km}
            </Text>
            <Text style={styles.CommonText}>
              Drop End KM : {userTripData?.drop_end_km}
            </Text>
            <Text style={styles.CommonText}>
              Drop End Date : {format(new Date(userTripData?.drop_end_time), 'dd-MM-yyyy')} 
            </Text>
            <Text style={styles.CommonText}>
              Drop End Time : {format(new Date(userTripData?.drop_end_time), 'h:mm a')} 
            </Text>
            <Text style={styles.CommonText}>
              Garage End KM : {userTripData?.garage_end_km}
            </Text>
            <Text style={styles.CommonText}>
              Garage End Date :  {format(new Date(userTripData?.garage_end_time), 'dd-MM-yyyy')} 
            </Text>
            <Text style={styles.CommonText}>
              Garage End Time : {format(new Date(userTripData?.garage_end_time), 'h:mm a')} 
            </Text>
            <Text style={styles.CommonText}>
              Night Halt Amount: ₹ {userTripData?.night_halt_amount}
            </Text>
            <Text style={styles.CommonText}>
              Number of Days: {userTripData?.number_of_days}
            </Text>
            <Text style={styles.CommonText}>
              Number of Nights: {userTripData?.number_of_nights}
            </Text>
            <Text style={styles.CommonText}>
              Permit Toll: {userTripData?.permit_toll}
            </Text>
            <Text style={styles.CommonText}>
              Diesel Amount : ₹ {userTripData?.diesel_amount}
            </Text>

            {/* <Text style={styles.CommonText}>
              Driver Bata Per KM : {userTripData?.driver_bata_per_km}
            </Text> */}
            {/* <Text style={styles.CommonText}>
              Pick up Drop Text: {userTripData?.pick_up_drop_text}
            </Text> */}

            <Text style={styles.CommonText}>
              Trip Date: {format(new Date(userTripData?.trip_date), 'dd-MM-yyyy')}
            </Text>
            <Text style={styles.CommonText}>
              Diesel KM : {userTripData?.diesel_km}
            </Text>
            <Text style={styles.CommonText}>
              Total Amount: ₹ {userTripData?.total_amount}
            </Text>
            <Text style={styles.CommonText}>
              Total KM: ₹ {userTripData?.total_km}
            </Text>
            <Text style={styles.CommonText}>
            Other Expense Name:  {userTripData?.other_expense_name}
            </Text>
            <Text style={styles.CommonText}>
            Other Expense Amount: ₹ {userTripData?.other_expense_amount}
            </Text>
          </View>
        </View>
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
    color: 'black',
    fontSize: 16,
    fontFamily: FONTS.FontRobotoRegular,
    marginBottom: 5,
  },
});
