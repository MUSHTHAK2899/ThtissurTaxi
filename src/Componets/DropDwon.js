import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../Constants/Constants';
import {TextInput} from 'react-native-paper';
import Display from '../utils/Display';

const DropDown = props => {
  const [isEnabled, setIsEnabled] = useState(props.secureText ? true : false);
  return (
    <TouchableOpacity style={{marginTop:5}} onPress={props.onPress}>
      <TextInput
        activeOutlineColor={'gray'}
        mode="outlined"
        outlineColor={'gray'}
        value={props.value}
        label={props.label}
        style={[styles.valueText,{width:props.width,backgroundColor:props.color}]}
        editable={false}
        placeholder={'Select'}
        right={<TextInput.Icon icon={'chevron-down'} onPress={props.onPress} />}
      />
    </TouchableOpacity>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  valueText: {
    fontFamily: FONTS.FontRobotoRegular,
    color: 'black',
    backgroundColor: '#fefce8',
  },
});
