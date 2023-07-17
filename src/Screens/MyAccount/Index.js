import { StyleSheet, Text, View,SafeAreaView ,StatusBar} from 'react-native'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Account = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: '#F4F4F4'}}>
    <SafeAreaView style={styles.safeAreaContainer} />
    <StatusBar
      translucent
      backgroundColor={'black'}
      barStyle={'light-content'}
    />
  <View style={{flex:1,backgroundColor:'white'}}>

  </View>
    </SafeAreaProvider>
  )
}

export default Account

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})