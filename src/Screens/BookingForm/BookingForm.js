import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Display from '../../utils/Display';
import {FONTS} from '../../Constants/Constants';
import Hedder from '../../Componets/Hedder';
import {TextInput, RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from '../../Componets/DropDwon';
import {format} from 'date-fns';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import LoadingMoadal from '../../Componets/LoadingMoadal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Drive from '../Drive/Drive';

const BookingForm = ({navigation}) => {
  const toast = useToast();
  const [tripId, setTripId] = useState();
  const [DriverName, setDriverName] = useState('');
  const [checked, setChecked] = useState('');
  const [VehicleNumber, setVehicleNumber] = useState('');
  const [ClientName, setClientName] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [PickUp, setPickUp] = useState('');
  const [Drop, setDrop] = useState('');
  const [VisitPlace, setVisitPlace] = useState('');
  const [StartingKMGarage, setStartingKMGarage] = useState(0);
  const [EndKMGarage, setEndKMGarage] = useState(0);
  const [StartingKMPickupPoint, setStartingKMPickupPoint] = useState(0);
  const [EndingKMPickupPoint, setEndingKMPickupPoint] = useState(0);
  const [NumberofDays, setNumberofDays] = useState(0);
  const [NumberofNight, setNumberofNight] = useState(0);
  const [PerimitTollParkingAmount, setPerimitTollParkingAmount] = useState(0);
  const [DieselAmount, setDieselAmount] = useState(0);
  const [DieselKm, setDieselKm] = useState(0);
  // start garage time
  const [startGrageDate, setstartGrageDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [startGrageTime, setstartGrageTime] = useState(new Date());
  const [showPickerTime, setShowPickerTime] = useState(false);
  const [endGrageDate, setEndGrageDate] = useState(new Date());
  const [showPickerEndDate, setShowPickerEndDate] = useState(false);
  const [endGrageTime, setEndGrageTime] = useState(new Date());
  const [showPickerEndTime, setShowPickerEndTime] = useState(false);
  // start pickup & drop time
  const [startDatePickupPoint, SetStartDatePickupPoint] = useState(new Date());
  const [showstartDatePickupPoint, setShowstartDatePickupPoint] =
    useState(false);
  const [startTimePickupPoint, SetStartTimePickupPoint] = useState(new Date());
  const [showstartTimePickupPoint, setShowstartTimePickupPoint] =
    useState(false);
  const [endDateDropPoint, setEndDateDropPoint] = useState(new Date());
  const [showEndDateDropPoint, setshowEndDateDropPoint] = useState(false);
  const [endTimeDropPoint, setEndTimeDropPoint] = useState(new Date());
  const [showEndTimeDropPoint, setshowEndTimeDropPoint] = useState(false);
  //api----
  const [TripData, setTripData] = useState({});
  const [loading, setLoading] = useState(false);

  //bottomTabPress
  const [ButtonShowSatus, setButtonShowStatus] = useState();

  const handleDateChange = (event, date) => {
    if (event.type == 'set') {
      setShowPicker(false);
      if (date) {
        setstartGrageDate(date);
      }
    } else {
      setShowPicker(false);
    }
  };
  const handleTimeChange = (event, date) => {
    if (event.type == 'set') {
      setShowPickerTime(false);
      if (date) {
        setstartGrageTime(date);
      }
    } else {
      setShowPickerTime(false);
    }
  };

  const handleEndDateChange = (event, date) => {
    if (event.type == 'set') {
      setShowPickerEndDate(false);
      if (date) {
        setEndGrageDate(date);
      }
    } else {
      setShowPickerEndDate(false);
    }
  };
  const handleEndTimeChange = (event, date) => {
    if (event.type == 'set') {
      setShowPickerEndTime(false);
      if (date) {
        setEndGrageTime(date);
      }
    } else {
      setShowPickerEndTime(false);
    }
  };

  const handleStartDatePickupPoint = (event, date) => {
    if (event.type == 'set') {
      setShowstartDatePickupPoint(false);
      if (date) {
        SetStartDatePickupPoint(date);
      }
    } else {
      setShowstartDatePickupPoint(false);
    }
  };

  const handleStartTimePickupPoint = (event, date) => {
    if (event.type == 'set') {
      setShowstartTimePickupPoint(false);
      if (date) {
        SetStartTimePickupPoint(date);
      }
    } else {
      setShowstartTimePickupPoint(false);
    }
  };

  const handleEndDateDropPoint = (event, date) => {
    if (event.type == 'set') {
      setshowEndDateDropPoint(false);
      if (date) {
        setEndDateDropPoint(date);
      }
    } else {
      setshowEndDateDropPoint(false);
    }
  };
  const handleEndTimeDropPoint = (event, date) => {
    if (event.type == 'set') {
      setshowEndTimeDropPoint(false);
      if (date) {
        setEndTimeDropPoint(date);
      }
    } else {
      setshowEndTimeDropPoint(false);
    }
  };

  useEffect(() => {
    setDriverName(TripData?.driver_name);
    setTripId(TripData?.trip_id);
  }, [TripData]);

  const GrageStartTime = format(startGrageDate, 'yyyy-MM-dd').concat(
          ' ', format(startGrageTime, 'HH:mm:ss'),
        );
  const GarageEndTime =format(endGrageDate, 'yyyy-MM-dd').concat(
          ' ',format(endGrageTime, 'HH:mm:ss'),
        );
  const PickUpStartTime =format(startDatePickupPoint, 'yyyy-MM-dd').concat(
          ' ', format(startTimePickupPoint, 'HH:mm:ss'),
        );
  const DropEndTime = format(endDateDropPoint, 'yyyy-MM-dd').concat(
          ' ', format(endTimeDropPoint, 'HH:mm:ss'),
        );
  const Data = {
    trip_id: tripId,
    vehicle_type:
      checked == 'first' ? 'Ac' : checked == 'second' ? 'NonAc' : '',
    vehicle_number: VehicleNumber,
    driver_name: DriverName,
    client_name: ClientName,
    company_name: CompanyName,
    pick_up_point: PickUp,
    visit_places: VisitPlace,
    drop_point: Drop,
    garage_start_km: StartingKMGarage,
    garage_end_km: EndKMGarage,
    pick_up_start_km: StartingKMPickupPoint,
    drop_end_km: EndingKMPickupPoint,
    garage_start_time: GrageStartTime,
    garage_end_time: GarageEndTime,
    pick_up_start_time: PickUpStartTime,
    drop_end_time: DropEndTime,
    number_of_days: NumberofDays,
    number_of_nights: NumberofNight,
    permit_toll: PerimitTollParkingAmount,
    diesel_amount: DieselAmount,
    diesel_km: DieselKm,
  };

  const HandleEndTrip = async () => {
    toast.hideAll()
    if (
      !VehicleNumber ||
      !driver_name ||
      !ClientName ||
      !CompanyName ||
      !PickUp ||
      !VisitPlace ||
      !Drop ||
      !StartingKMGarage ||
      !EndKMGarage ||
      !StartingKMPickupPoint ||
      !EndingKMPickupPoint ||
      !NumberofDays ||
      !NumberofNight ||
      !PerimitTollParkingAmount ||
      !DieselAmount ||
      !DieselKm
    ) {
      toast.show("some mandatory fields are missing",{
        type:'danger',
      });
    } else {
      setLoading(true);
      const res = await Api.EndTrip(Data).catch(err => {
        setLoading(false);
        console.log(err);
        toast.show( `${err?.message}`,{
          type:'danger',
        });
      });
      if (res.data && res.data.status == 200) {
        setLoading(false);
        console.log('UpdateTrip res', res);
        setTripData(res.data?.data?.trip_data);
        setButtonShowStatus(res.data?.data?.show_start_trip_button);
        AsyncStorage.setItem(
          'TripDetails',
          JSON.stringify(res.data?.data?.trip_data),
        );
        AsyncStorage.setItem(
          'TripSatus',
          JSON.stringify(res.data?.data?.show_start_trip_button),
        );
        toast.show( `${res.data?.message}`,{
          type:'success',
        });
      } else {
        setLoading(false);
        console.log('UpdateTrip res 2', res);
        toast.show( `${res.data?.message}`,{
          type:'warning',
        });
      }
    }
  };

  const HandleUpdateTrip = async () => {
    toast.hideAll()
    setLoading(true);
    const res = await Api.UpdateTrip(Data).catch(err => {
      setLoading(false);
      console.log(err);
      toast.show( `${err?.message}`,{
        type:'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      console.log('UpdateTrip res', res);
      setTripData(res.data?.data?.trip_data);
      setButtonShowStatus(res.data?.data?.show_start_trip_button);
      AsyncStorage.setItem(
        'TripDetails',
        JSON.stringify(res.data?.data?.trip_data),
      );
      AsyncStorage.setItem(
        'TripSatus',
        JSON.stringify(res.data?.data?.show_start_trip_button),
      );
      toast.show( `${res.data?.message}`,{
        type:'success',
      });
    } else {
      setLoading(false);
      console.log('UpdateTrip res 2', res);
      toast.show( `${res.data?.message}`,{
        type:'warning',
      });
    }
  };

  const HandleCancelTrip = async () => {
    toast.hideAll()
    setLoading(true);
    const res = await Api.CancelTrip({
      trip_id: TripData?.trip_id,
    }).catch(err => {
      setLoading(false);
      console.log(err);
      toast.show( `${err?.message}`,{
        type:'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setLoading(false);
      console.log('HandleCancelTrip res', res);
      AsyncStorage.setItem(
        'TripDetails',
        JSON.stringify(res.data?.data?.trip_data),
      );
      setTripData(res.data?.data?.trip_data);
      setButtonShowStatus(res.data?.data?.show_start_trip_button);
      AsyncStorage.setItem(
        'TripSatus',
        JSON.stringify(res.data?.data?.show_start_trip_button),
      );
      // navigation.navigate('Home');
      toast.show( `${res.data?.message}`,{
        type:'success',
      });
    } else {
      setLoading(false);
      console.log('HandleCancelTrip res 2', res);
      toast.show( `${res.data?.message}`,{
        type:'warning',
      });
    }
  };

  const GetDriveDetails = async () => {
    setLoading(true);
    await Api.GetDriveDetails()
      .catch(err => {
        setLoading(false);
        console.log('HandleDriverCode', err);
      })
      .then(res => {
        setLoading(false)
        setButtonShowStatus(res.data?.data?.show_start_trip_button);
        console.log('res GetDriveDetails', res.data?.data);
        AsyncStorage.setItem(
          'TripDetails',
          JSON.stringify(res.data?.data?.trip_data),
        );
        setTripData(res.data?.data?.trip_data);
        AsyncStorage.setItem(
          'TripSatus',
          JSON.stringify(res.data?.data?.show_start_trip_button),
        );
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      var accessuser = await AsyncStorage.getItem('TripDetails');
      const acyncType = JSON.parse(accessuser);
      setTripData(acyncType);
      GetDriveDetails();
    });
    return unsubscribe;
  }, [navigation]);

  const HandleStartTrip = async () => {
    toast.hideAll()
    setLoading(true);
    const res = await Api.StartTrip({}).catch(err => {
      setLoading(false);
      console.log(err);
      toast.show( `${err?.message}`,{
        type:'danger',
      });
    });
    if (res.data && res.data.status == 200) {
      setButtonShowStatus(res.data?.data?.show_start_trip_button);
      setLoading(false);
      console.log('login res', res);
      AsyncStorage.setItem(
        'TripDetails',
        JSON.stringify(res.data?.data?.trip_data),
      );
      setTripData(res.data?.data?.trip_data);
      toast.show( `${res.data?.message}`,{
        type:'success',
      });
    } else {
      setLoading(false);
      console.log('login res 2', res.data);
      toast.show( `${res.data?.message}`,{
        type:'warning',
      });
    }
  };

  return (
    <>
      {ButtonShowSatus == 0 ? (
        <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
          <SafeAreaView style={styles.safeAreaContainer} />
          <StatusBar
            translucent
            backgroundColor={'#FFBF00'}
            barStyle={'light-content'}
          />
          <Hedder name={'Booking Form'} navigation={navigation} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1, backgroundColor: '#fefce8'}}>
            <View style={{flex: 1}}>
              <ScrollView style={{flex: 1, backgroundColor: '#fefce8'}}>
                <View
                  style={{
                    backgroundColor: '#fefce8',
                    marginHorizontal: 20,
                    marginVertical: 20,
                    marginBottom: 50,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.hedderText}>Vehicle Type</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                        color={'#FFBF00'}
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: FONTS.FontRobotoMedium,
                          fontSize: 15,
                        }}>
                        Ac
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                        color={'#FFBF00'}
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: FONTS.FontRobotoMedium,
                          fontSize: 15,
                        }}>
                        NonAc
                      </Text>
                    </View>
                  </View>
                  <TextInput
                    label="Driver Name"
                    value={DriverName}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setDriverName(text)}
                    keyboardType="ascii-capable"
                  />
                  <TextInput
                    label="Vehicle Number"
                    value={VehicleNumber}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setVehicleNumber(text)}
                    keyboardType="ascii-capable"
                    maxLength={10}
                    autoCapitalize="characters"
                  />
                  <TextInput
                    label="Client Name"
                    value={ClientName}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setClientName(text)}
                    keyboardType="ascii-capable"
                  />
                  <TextInput
                    label="Company Name"
                    value={CompanyName}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setCompanyName(text)}
                    keyboardType="ascii-capable"
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      label="Enter Pick Up"
                      value={PickUp}
                      style={styles.valueText2}
                      activeOutlineColor={'black'}
                      mode="outlined"
                      outlineColor={'black'}
                      onChangeText={text => setPickUp(text)}
                      keyboardType="ascii-capable"
                    />
                    <TextInput
                      label="Enter Drop"
                      value={Drop}
                      style={[styles.valueText2, {marginLeft: 10}]}
                      activeOutlineColor={'black'}
                      mode="outlined"
                      outlineColor={'black'}
                      onChangeText={text => setDrop(text)}
                      keyboardType="ascii-capable"
                    />
                  </View>

                  <TextInput
                    label="Enter Visit Place"
                    value={VisitPlace}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setVisitPlace(text)}
                    keyboardType="ascii-capable"
                  />
                  <DropDown
                   color={'#fefce8'}
                    value={
                      startGrageDate ? format(startGrageDate, 'dd/MM/yy') : ''
                    }
                    label={'Starting Date Garage'}
                    onPress={() => setShowPicker(true)}
                    width={''}
                  />
                  {showPicker && (
                    <DateTimePicker
                      value={startGrageDate || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleDateChange}
                    />
                  )}
                  <DropDown
                  color={'#fefce8'}
                    value={
                      startGrageTime
                        ? startGrageTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    label={'Starting time Garage'}
                    onPress={() => setShowPickerTime(true)}
                    width={''}
                  />
                  {showPickerTime && (
                    <DateTimePicker
                      value={startGrageTime || new Date()}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleTimeChange}
                    />
                  )}

                  <TextInput
                    label="Starting KM Garage"
                    value={StartingKMGarage}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setStartingKMGarage(text)}
                    keyboardType="number-pad"
                  />
                  <DropDown
                  color={'#fefce8'}
                    value={
                      startDatePickupPoint
                        ? format(startDatePickupPoint, 'dd/MM/yy')
                        : ''
                    }
                    label={'Starting Date Pickup Point'}
                    onPress={() => setShowstartDatePickupPoint(true)}
                    width={''}
                  />
                  {showstartDatePickupPoint && (
                    <DateTimePicker
                      value={startDatePickupPoint || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleStartDatePickupPoint}
                    />
                  )}
                  <DropDown
                  color={'#fefce8'}
                    value={
                      startTimePickupPoint
                        ? startTimePickupPoint.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    label={'Starting time Pickup Point'}
                    onPress={() => setShowstartTimePickupPoint(true)}
                    width={''}
                  />
                  {showstartTimePickupPoint && (
                    <DateTimePicker
                      value={startTimePickupPoint || new Date()}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleStartTimePickupPoint}
                    />
                  )}
                  <TextInput
                    label="Starting KM Pickup Point"
                    value={StartingKMPickupPoint}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setStartingKMPickupPoint(text)}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    label="End KM Drop Point"
                    value={EndingKMPickupPoint}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setEndingKMPickupPoint(text)}
                    keyboardType="number-pad"
                  />
                   <DropDown
                  color={'#fefce8'}
                    value={
                      endDateDropPoint
                        ? format(endDateDropPoint, 'dd/MM/yy')
                        : ''
                    }
                    label={'End Date Drop Point'}
                    onPress={() => setshowEndDateDropPoint(true)}
                    width={''}
                  />
                  {showEndDateDropPoint && (
                    <DateTimePicker
                      value={endDateDropPoint || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleEndDateDropPoint}
                    />
                  )}
                  <DropDown
                  color={'#fefce8'}
                    value={
                      endTimeDropPoint
                        ? endTimeDropPoint.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    label={'End Time Drop Point'}
                    onPress={() => setshowEndTimeDropPoint(true)}
                    width={''}
                  />
                  {showEndTimeDropPoint && (
                    <DateTimePicker
                      value={endTimeDropPoint || new Date()}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleEndTimeDropPoint}
                    />
                  )}
                  <DropDown
                  color={'#fefce8'}
                    value={endGrageDate ? format(endGrageDate, 'dd/MM/yy') : ''}
                    label={'End Date Garage'}
                    onPress={() => setShowPickerEndDate(true)}
                    width={''}
                  />
                  {showPickerEndDate && (
                    <DateTimePicker
                      value={endGrageDate || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleEndDateChange}
                    />
                  )}
                  <DropDown
                  color={'#fefce8'}
                    value={
                      endGrageTime
                        ? endGrageTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    label={'End time Garage'}
                    onPress={() => setShowPickerEndTime(true)}
                    width={''}
                  />
                  {showPickerEndTime && (
                    <DateTimePicker
                      value={endGrageTime || new Date()}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleEndTimeChange}
                    />
                  )}
                  <TextInput
                    label="End KM Garage"
                    value={EndKMGarage}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setEndKMGarage(text)}
                    keyboardType="number-pad"
                  />


                    <TextInput
                      label="Number of Days"
                      value={NumberofDays}
                      style={styles.valueText}
                      activeOutlineColor={'black'}
                      mode="outlined"
                      outlineColor={'black'}
                      onChangeText={text => setNumberofDays(text)}
                      keyboardType="number-pad"
                    />
                    <TextInput
                      label="Number Of Nights"
                      value={NumberofNight}
                      style={[styles.valueText]}
                      activeOutlineColor={'black'}
                      mode="outlined"
                      outlineColor={'black'}
                      onChangeText={text => setNumberofNight(text)}
                      keyboardType="number-pad"
                    />
                  <TextInput
                    label="Perimit,Toll & Parking Amount"
                    value={PerimitTollParkingAmount}
                    style={styles.valueText}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setPerimitTollParkingAmount(text)}
                    keyboardType="number-pad"
                  />
                  <View style={{flexDirection: 'row'}}>
                  <TextInput
                    label="Diesel Amount"
                    value={DieselAmount}
                    style={styles.valueText2}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setDieselAmount(text)}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    label="Diesel Km"
                    value={DieselKm}
                    style={[styles.valueText2,{marginLeft:10}]}
                    activeOutlineColor={'black'}
                    mode="outlined"
                    outlineColor={'black'}
                    onChangeText={text => setDieselKm(text)}
                    keyboardType="number-pad"
                  />
                  </View>
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                gap: 5,
                height: Display.setHeight(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={HandleUpdateTrip}
                style={[styles.buttonView, {backgroundColor: '#28a745'}]}>
                <Text style={styles.buttonText}>Update Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonView}
                onPress={HandleEndTrip}>
                <Text style={styles.buttonText}>End Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={HandleCancelTrip}
                style={[styles.buttonView, {backgroundColor: 'red'}]}>
                <Text style={styles.buttonText}>Cancel Trip</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          {loading && <LoadingMoadal />}
        </SafeAreaProvider>
      ) : (
        <Drive HandleStartTrip={HandleStartTrip} loading={loading} />
      )}
    </>
  );
};

export default BookingForm;

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
    marginTop: 10,
  },
  valueText2: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: '#fefce8',
    fontSize: 16,
    width: Display.setWidth(43),
    marginTop: 10,
  },
  hedderText: {
    color: 'black',
    fontFamily: FONTS.FontRobotoMedium,
    marginTop: 10,
    fontSize: 15,
  },
  buttonView: {
    borderRadius: 100,
    backgroundColor: '#FFBF00',
    // marginHorizontal: 16,
    marginBottom: 13,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(29),
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: FONTS.FontRobotoMedium,
  },
  headerName: {
    fontFamily: FONTS.FontRobotoBold,
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
  },
});
