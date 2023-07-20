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
    Button
  } from 'react-native';
  import React, {useState} from 'react';
  import {SafeAreaProvider} from 'react-native-safe-area-context';
  import Display from '../../utils/Display';
  import {FONTS} from '../../Constants/Constants';
  import Hedder from '../../Componets/Hedder';
  import {TextInput, Checkbox} from 'react-native-paper';
  
  
  const BookingForm = ({navigation}) => {
    const [checked, setChecked] = React.useState(false);
    const [checkedNonAc, setCheckedNonAc] = useState(false);
    const [VehicleNumber, setVehicleNumber] = useState('');
    const [ClientName, setClientName] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [PickUp, setPickUp] = useState('');
    const [Drop, setDrop] = useState('');
    const [VisitPlace, setVisitPlace] = useState('');
    const [StartingKMGarage, setStartingKMGarage] = useState('');
    const [EndKMGarage, setEndKMGarage] = useState('');
    const [StartingKMPickupPoint, setStartingKMPickupPoint] = useState('');
    const [EndingKMPickupPoint, setEndingKMPickupPoint] = useState('');
    const [NumberofDays, setNumberofDays] = useState('');
    const [NumberofNight, setNumberofNight] = useState('');
    const [PerimitTollParkingAmount, setPerimitTollParkingAmount] = useState('');
    const [DieselAmount, setDieselAmount] = useState('');
    const [DieselKm, setDieselKm] = useState('');
  
  
    return (
      <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
        <SafeAreaView style={styles.safeAreaContainer} />
        <StatusBar
          translucent
          backgroundColor={'#FFBF00'}
          barStyle={'light-content'}
        />
        <Hedder name={'Booking Form'} navigation={navigation} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1,backgroundColor:'white'}}>
        <ScrollView style={{backgroundColor: 'white',flex:1}}>
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 20,
              marginVertical: 20,
              marginBottom:50
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: FONTS.FontRobotoBold,
              }}>
              HI,Liju
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.hedderText}>Vehicle Trip</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={'#FFBF00'}
                />
                <Text
                  style={{
                    color: 'black',
                    fontFamily: FONTS.FontRobotoMedium,
                    fontSize: 15,
                  }}>
                  A/C
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  status={checkedNonAc ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setCheckedNonAc(!checkedNonAc);
                  }}
                  color={'#FFBF00'}
                />
                <Text
                  style={{
                    color: 'black',
                    fontFamily: FONTS.FontRobotoMedium,
                    fontSize: 15,
                  }}>
                  NON A/C
                </Text>
              </View>
            </View>
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
              autoCapitalize='characters'
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
            <View style={{flexDirection:'row'}}>
            <TextInput
              label="Enter Pick Up"
              value={ PickUp}
              style={styles.valueText2}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setPickUp(text)}
              keyboardType="ascii-capable"
            />
                   <TextInput
              label="Enter Drop"
              value={ Drop}
              style={[styles.valueText2,{marginLeft:10}]}
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
              label="End KM Pickup Point"
              value={EndingKMPickupPoint}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setEndingKMPickupPoint(text)}
              keyboardType="number-pad"
            />
   
  
   <View style={{flexDirection:'row'}}>
            <TextInput
              label="Number of Days"
              value={NumberofDays}
              style={styles.valueText2}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setNumberofDays(text)}
              keyboardType="ascii-capable"
            />
                   <TextInput
              label="Number of Night"
              value={NumberofNight}
              style={[styles.valueText2,{marginLeft:10}]}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setNumberofNight(text)}
              keyboardType="ascii-capable"
            />
            </View>
  
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
  
            <TextInput
              label="Diesel Amount"
              value={DieselAmount}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setDieselAmount(text)}
              keyboardType="number-pad"
            />
            <TextInput
              label="Diesel Km"
              value={DieselKm}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setDieselKm(text)}
              keyboardType="number-pad"
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.buttonView}>
            <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
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
      backgroundColor: 'white',
      fontSize: 16,
      width: '100%',
      marginTop:10
    },
    valueText2: {
      fontFamily: FONTS.FontRobotoRegular,
      color: 'black',
      backgroundColor: 'white',
      fontSize: 16,
      width: Display.setWidth(43),
      marginTop:10
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
        marginHorizontal: 16,
        marginBottom: 13,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 16,
        color: 'white',
      },
  });
  