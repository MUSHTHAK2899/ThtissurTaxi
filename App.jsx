import {StyleSheet, Text, View, LogBox} from 'react-native';
import React from 'react';
import StackNavigation from './src/Routes/Stack';
import FlashMessage from 'react-native-flash-message';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <>
      <FlashMessage position="top" statusBarHeight={28} />
      <ToastProvider
        placement="top"
        offsetTop={40}
        animationType="slide-in"
        duration={3000}>
        <StackNavigation />
      </ToastProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
