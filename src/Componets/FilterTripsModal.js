import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {FONTS} from '../Constants/Constants';
import Display from '../utils/Display';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput,Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from './DropDwon';
import {format} from 'date-fns';

const FilterTripsModal = props => {
  const {
    loading,
    handleFilterFromDate,
    setShowPicker,
    showPicker,
    FilterFromDate,
    handleFilterToDate,
    showPickerToDate,
    setShowPickerTodate,
    FilterToDate,
    setOpenCompanyList,
    openCompanyList,
    setValueCompanyList,
    valueCompanyList,
    companyList,
    VehicleNumberList,
    setOpenVehicleNumberList,
    openVehicleNumberList,
    setValueVehicleNumberList,
    valueVehicleNumberList,
    driversList,
    setOpenDriversList,
    openDriversList,
    setValueDriversList,
    valueDriversList,
    cashOrCreditList,
    setOpenCashOrCreditList,
    openCashOrCreditList,
    setValueCashOrCreditList,
    valueCashOrCreditList,
    setPlaceorClient,
    PlaceOrClient,
    HandleFilterModal,
  } = props;
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}
      onBackButtonPress={props.onBackdropPress}
      backdropOpacity={0.2}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View
        style={{
          width: Display.setWidth(100),
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 18,
          paddingTop: 28,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontFamily: FONTS.FontRobotoBold,
            }}>
            Filter Trips Modal
          </Text>
          <View style={{marginVertical: 12}}>
            <DropDown
              color={'white'}
              value={FilterFromDate ? format(FilterFromDate, 'dd/MM/yy') : ''}
              label={'From Date'}
              onPress={() => setShowPicker(true)}
              width={''}
            />
          </View>
          {showPicker && (
            <DateTimePicker
              value={FilterFromDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleFilterFromDate}
            />
          )}
          <DropDown
            color={'white'}
            value={FilterToDate ? format(FilterToDate, 'dd/MM/yy') : ''}
            label={'To Date'}
            onPress={() => setShowPickerTodate(true)}
            width={''}
          />
          {showPickerToDate && (
            <DateTimePicker
              value={FilterToDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleFilterToDate}
            />
          )}

          <View style={{marginVertical: 19}}>
            <DropDownPicker
              open={openCompanyList}
              placeholder="Select company Name"
              value={valueCompanyList}
              items={companyList}
              setOpen={setOpenCompanyList}
              setValue={setValueCompanyList}
              dropDownDirection="TOP"
              maxHeight={190}
            />
          </View>
          <View style={{}}>
            <DropDownPicker
              open={openVehicleNumberList}
              placeholder="Select Vehicle Number"
              value={valueVehicleNumberList}
              items={VehicleNumberList}
              setOpen={setOpenVehicleNumberList}
              setValue={setValueVehicleNumberList}
              dropDownDirection="TOP"
            />
          </View>
          <View style={{marginVertical: 19}}>
            <DropDownPicker
              open={openDriversList}
              placeholder="Select Driver"
              value={valueDriversList}
              items={driversList}
              setOpen={setOpenDriversList}
              setValue={setValueDriversList}
              dropDownDirection="TOP"
            />
          </View>
          <View style={{}}>
            <DropDownPicker
              open={openCashOrCreditList}
              placeholder="Select Cash Or Credit"
              value={valueCashOrCreditList}
              items={cashOrCreditList}
              setOpen={setOpenCashOrCreditList}
              setValue={setValueCashOrCreditList}
              dropDownDirection="TOP"
            />
          </View>
          <View style={{marginVertical: 19}}>
            <TextInput
              label="Place or Client"
              value={PlaceOrClient}
              style={styles.valueText}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setPlaceorClient(text)}
              keyboardType="ascii-capable"
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={HandleFilterModal}
            style={[styles.buttonView, {backgroundColor: '#28a745'}]}>
            <Button loading={loading}>
            <Text style={styles.buttonText}>submit</Text>
            </Button>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FilterTripsModal;

const styles = StyleSheet.create({
  valueText: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    width: '100%',
    // marginTop: 15,
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
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.FontRobotoRegular,
  },
});
