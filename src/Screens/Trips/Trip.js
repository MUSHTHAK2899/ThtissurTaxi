import React, { useState } from 'react';
import { View, Button, Platform,StyleSheet,Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const Trip = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  return (
    <View>
      <Text>Trip</Text>
      <View>
      <Button onPress={showDatepicker} title="Show Date/Time Picker" />
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time" // or 'time' for time picker, or 'datetime' for both date and time
          is24Hour={false}
          display="default" // options: 'default', 'spinner', 'calendar', 'clock'
          onChange={onChange}
        />
      )}
    </View>
    </View>
  )
}

export default Trip

const styles = StyleSheet.create({})