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
import Splashs from '../../Assets/Splash.png'
import Display from '../../utils/Display';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    Path();
  }, []);

  const Path = async () => {
    const accessToken = await AsyncStorage.getItem('userAccessToken');
    var accessuser = await AsyncStorage.getItem('userDetails');
    const acyncType = JSON.parse(accessuser);
    // console.log("verify_status",acyncType);
    if (accessToken !== null && acyncType?.verify_status == 1) {
      setTimeout(() => navigation.navigate('Home'), 2000);
    } else {
      setTimeout(() => navigation.replace('OnBord'), 3000)
    }
  };


  return (
    <>
      <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer} />
      <StatusBar
        translucent
        backgroundColor={'#FFF'}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        {/* <MotiView
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
        </MotiView> */}
          <Image style={{width:Display.setWidth(100),height:'100%'}} resizeMode='stretch' source={Splashs}/>
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
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default Splash;
