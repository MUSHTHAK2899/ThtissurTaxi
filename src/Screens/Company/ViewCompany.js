import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Linking,
    Share,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {SafeAreaProvider} from 'react-native-safe-area-context';
  import Display from '../../utils/Display';
  import {FONTS} from '../../Constants/Constants';
  import Hedder from '../../Componets/Hedder';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import Feather from 'react-native-vector-icons/Feather';
  import {format} from 'date-fns';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  
  const ViewCompany = ({navigation}) => {

  
    return (
      <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
        <SafeAreaView style={styles.safeAreaContainer} />
        <StatusBar
          translucent
          backgroundColor={'#FFBF00'}
          barStyle={'light-content'}
        />
        <Hedder name={'Company Preview'} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: '#fefce8',
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 20,
              borderRadius: 10,
              elevation: 10,
              backgroundColor: 'white',
            }}>
            <View style={{marginHorizontal: 15, marginVertical: 20}}>
              <View style={[styles.TextHead, {marginTop: 7}]}>
                <Text style={styles.CommonText}>Trn Number :</Text>
                <Text
                  style={[
                    styles.CommonText,
                    {fontSize: 16, fontFamily: FONTS.FontRobotoMedium},
                  ]}>
             ff
                </Text>
              </View>
              
            </View>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  };
  
  export default ViewCompany;
  
  const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 0,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    CommonText: {
      color: 'white',
      fontSize: 13,
      fontFamily: FONTS.FontRobotoRegular,
      flexShrink: 1,
      // marginBottom: 5,
    },
    TextHead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#155e75',
      padding: 10,
      borderRadius: 7,
      elevation: 4,
      marginBottom: 12,
    },
  });
  