import { StyleSheet, Text, View,LogBox } from 'react-native'
import React from 'react'
import StackNavigation from './src/Routes/Stack'

const App = () => {
  LogBox.ignoreAllLogs();
  return (
   <>
    <StackNavigation/>
   </>
  )
}

export default App

const styles = StyleSheet.create({})