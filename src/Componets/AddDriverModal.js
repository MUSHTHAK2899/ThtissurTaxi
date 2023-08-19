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
import { Button } from 'react-native-paper';

const AddDriverModal = props => {
  const {
    AddDriverName,
    setAddDriverName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    open,
    open1,
    setOpen,
    setOpen1,
    value,
    value1,
    items,
    items1,
    setItems,
    setItems1,
    setValue,
    setValue1,
    HandleAddUser,
    ModalTitle,
    ModalButtonText,
    AdminUpdateDriver,
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
           {ModalTitle}
          </Text>
          <TextInput
            label="Name"
            value={AddDriverName}
            style={styles.valueText}
            activeOutlineColor={'black'}
            mode="outlined"
            outlineColor={'black'}
            onChangeText={text => setAddDriverName(text)}
          />
          <TextInput
            label="Email"
            value={email}
            style={styles.valueText}
            activeOutlineColor={'black'}
            mode="outlined"
            outlineColor={'black'}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Mobile Number"
            value={mobileNumber}
            style={styles.valueText}
            activeOutlineColor={'black'}
            mode="outlined"
            outlineColor={'black'}
            onChangeText={text => setMobileNumber(text)}
            keyboardType="number-pad"
            maxLength={10}
          />
          <TextInput
            label="Password"
            value={password}
            style={styles.valueText}
            activeOutlineColor={'black'}
            mode="outlined"
            outlineColor={'black'}
            onChangeText={text => setPassword(text)}
          />
          <View style={{marginTop: 19}}>
            <DropDownPicker
              open={open}
              placeholder="Select email verification status"
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View style={{marginVertical: 19}}>
            <DropDownPicker
              open={open1}
              placeholder=" Select Account Active Status"
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
            />
          </View>
          <TouchableOpacity
          disabled={loading}
            onPress={ModalButtonText =='Add Driver'? HandleAddUser : AdminUpdateDriver}
            style={[styles.buttonView, {backgroundColor: '#28a745'}]}>
            <Text style={styles.buttonText}>{ModalButtonText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddDriverModal;

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
