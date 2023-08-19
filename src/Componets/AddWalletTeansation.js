import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {FONTS} from '../Constants/Constants';
import Display from '../utils/Display';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from './DropDwon';
import {format} from 'date-fns';

const AddWalletTransation = props => {
  const {
    open,
    setOpen,
    value,
    items,
    setItems,
    setValue,
    amount,
    setAmount,
    setDisCription,
    DisCription,
    HandleTransaction,
    handleDateChange,
    handleTimeChange,
    TransactionDate,
    TransactionTime,
    setShowPicker,
    showPicker,
    setShowPickerTime,
    showPickerTime,
    loading
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
            Make Transaction
          </Text>
          <TextInput
            label="Enter Amount"
            value={amount}
            style={styles.valueText}
            activeOutlineColor={'black'}
            mode="outlined"
            outlineColor={'black'}
            onChangeText={text => setAmount(text)}
            keyboardType='number-pad'
          />
          <DropDown
            value={TransactionDate ? format(TransactionDate, 'dd/MM/yy') : ''}
            label={'Transaction Date'}
            onPress={() => setShowPicker(true)}
            width={''}
            color={'white'}
          />
          {showPicker && (
            <DateTimePicker
              value={TransactionDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}
          <DropDown
            value={
                TransactionTime
                ? TransactionTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''
            }
            label={'Transaction Time'}
            onPress={() => setShowPickerTime(true)}
            width={''}
            color={'white'}
          />
          {showPickerTime && (
            <DateTimePicker
              value={TransactionTime || new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}
          <View style={{marginTop: 20}}>
            <DropDownPicker
              open={open}
              placeholder=" Select Verify Status"
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <TextInput
              label="Description"
              value={DisCription}
              style={styles.valueText}
              multiline={true}
              activeOutlineColor={'black'}
              mode="outlined"
              outlineColor={'black'}
              onChangeText={text => setDisCription(text)}
            />
          </View>
          <TouchableOpacity
          disabled={loading}
            onPress={HandleTransaction}
            style={[styles.buttonView, {backgroundColor: '#28a745'}]}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddWalletTransation;

const styles = StyleSheet.create({
  valueText: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    width: '100%',
    marginTop: 15,
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
