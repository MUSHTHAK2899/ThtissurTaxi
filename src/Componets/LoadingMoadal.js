import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { FONTS } from '../Constants/Constants';

const LoadingMoadal = () => {
  return (
    <View>
           <Modal
          isVisible={true}
          style={{justifyContent: 'center'}}
          animationType="fade">
          <View style={styles.container}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
            <Text style={{fontFamily:FONTS.FontRobotoBold,fontSize:18,marginTop:15,color:'white'}}>Loading....</Text>

            </View>
          </View>
        </Modal>
    </View>
  )
}

export default LoadingMoadal

const styles = StyleSheet.create({})