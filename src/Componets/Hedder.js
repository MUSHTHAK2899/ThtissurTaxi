import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTS } from '../Constants/Constants';

const Hedder = ({name,navigation}) => {
  return (
    <View style={{backgroundColor:'#FFBF00',height:55,elevation:10,flexDirection:'row',alignItems:'center'}}>
       <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginHorizontal:7}}  onPress={() => navigation.goBack()}>
       <MaterialCommunityIcons
        name={'chevron-left'}
        color={'white'}
        size={29}
       
      />
      <Text style={styles.headerName}>{name}</Text>
       </TouchableOpacity>
    </View>
  )
}

export default Hedder

const styles = StyleSheet.create({
      headerName: {
        fontFamily: FONTS.FontRobotoBold,
        fontSize: 18,
        color: 'white',
        textTransform: 'capitalize',
      },
})