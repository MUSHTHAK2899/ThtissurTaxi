import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Share,
    Clipboard,
    Alert,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Hedder from '../../Componets/Hedder';
  import {SafeAreaProvider} from 'react-native-safe-area-context';
  import {DriveLIst} from '../../Componets/DummyData';
  import {FONTS} from '../../Constants/Constants';
  import Api from '../../Api/GeneralApi';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useToast} from 'react-native-toast-notifications';
  import LoadingMoadal from '../../Componets/LoadingMoadal';
  import Display from '../../utils/Display';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {useIsFocused} from '@react-navigation/native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

  const Company = ({navigation}) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    
    function FocusAwareStatusBar(props) {
      const isFocused = useIsFocused();
      return isFocused ? <StatusBar {...props} /> : null;
    }

    const OnCompanyLIst=({item})=>{
        return(
            <>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 15,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  elevation: 10,
                }}>
                <View
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                       <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontFamily: FONTS.FontRobotoBold,
                  }}>Company Name : {item?.name}</Text>

            </View>
            <View style={{ marginHorizontal: 20,flexDirection:'row',justifyContent:'flex-end',gap:15,marginBottom:10}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('ViewCompany')}
                  style={[styles.buttonView]}
              >
                  <Ionicons name={'eye'} color={'white'} size={25} />
                </TouchableOpacity>
               <TouchableOpacity
               onPress={()=>navigation.navigate('EditCompany')}
                  style={[styles.buttonView,{flexDirection:'row'}]}
                  >
                  {/* <Text>Edit</Text> */}
                  <FontAwesome name={'edit'} color={'white'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonView]}
                >
                  <MaterialCommunityIcons
                    name={'delete'}
                    color={'white'}
                    size={25}
                  />
                </TouchableOpacity>
               </View>
            </View>

          </>
        )
    }
  

  
    return (
      <>
        <SafeAreaProvider style={{backgroundColor: '#fefce8'}}>
          <SafeAreaView style={styles.safeAreaContainer} />
          <FocusAwareStatusBar
            translucent
            backgroundColor={'#FFBF00'}
            barStyle={'light-content'}
          />
          <Hedder name={'Company'} navigation={navigation} />
          <View
            style={{
              flex: 1,
              backgroundColor: '#fefce8',
              marginTop: 20,
              marginBottom: Display.setHeight(4),
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginHorizontal: 30,
                  gap: 30,
                }}>
                <TouchableOpacity onPress={()=>navigation.navigate('AddCompany')}>
                  <MaterialIcons
                    name={'my-library-add'}
                    color={'black'}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 15}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DriveLIst}
              renderItem={OnCompanyLIst}
              keyExtractor={(item, index) => index.toString()}
            //   onEndReached={onEndReachedEnd}
              onEndReachedThreshold={1}
              ListFooterComponent={
                isLoading ? (
                  <View style={{marginBottom: 40}}>
                    <ActivityIndicator size="small" />
                  </View>
                ) : null
              }
            />

            </View>
          </View>
        </SafeAreaProvider>
        {loading && <LoadingMoadal />}
      </>
    );
  };
  
  export default Company;
  
  const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 0,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    buttonView: {
        borderRadius: 10,
        backgroundColor: '#134e4a',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: Display.setWidth(14),
      },
      buttonText: {
        fontSize: 14,
        color: 'white',
        fontFamily: FONTS.FontRobotoMedium,
      },
   
  });
  