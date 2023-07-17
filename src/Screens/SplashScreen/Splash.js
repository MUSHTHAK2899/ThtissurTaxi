import React, {useEffect} from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  Image
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MotiView} from 'moti';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('OnBord'), 4000)
  }, []);


  return (
    <>
      <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'black'}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <MotiView
          from={{opacity: 0, translateY: 100}}
          animate={{opacity: 1, translateY: 0}}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 1000,
          }}
          exit={{
            opacity: 0,
          }}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image  source={require('../../Assets/TaxiLogo.png')}/>
        </MotiView>
      </View>
    </SafeAreaProvider>
    </>
  );
};
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Splash;
