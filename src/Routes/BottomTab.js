import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Account from '../Screens/MyAccount/Index';
import Trip from '../Screens/Trips/Trip';
import BookingForm from '../Screens/BookingForm/BookingForm';
import Drivers from '../Screens/Drivers/Index';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomTab = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const [userLoginData, setUserLoginData] = useState({});

  const userDetails = async () => {
    var accessuser = await AsyncStorage.getItem('userDetails');
    const acyncType = JSON.parse(accessuser);
    setUserLoginData(acyncType);
    console.log('loginData', acyncType);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userDetails();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) =>
            color === 'black' ? (
              <Icon name={'home'} color={'black'} size={25} />
            ) : (
              <Icon name={'home-outline'} color={'black'} size={20} />
            ),
        }}
      />
      {userLoginData?.user_type == 'DriverAdmin' && (
        <Tab.Screen
          name="Drivers"
          component={Drivers}
          options={{
            tabBarIcon: ({color, size}) =>
              color === 'black' ? (
                <FontAwesome name={'users'} color={'black'} size={25} />
              ) : (
                <Feather name={'users'} color={'black'} size={20} />
              ),
          }}
        />
      )}

      <Tab.Screen
        name="Drive"
        component={BookingForm}
        options={{
          tabBarIcon: ({color, size}) =>
            color === 'black' ? (
              <MaterialCommunityIcons
                name={'steering'}
                color={'black'}
                size={25}
              />
            ) : (
              <MaterialCommunityIcons
                name={'steering'}
                color={'black'}
                size={20}
              />
            ),
        }}
      />
      <Tab.Screen
        name="My Trips"
        component={Trip}
        options={{
          tabBarIcon: ({color, size}) =>
            color === 'black' ? (
              <FontAwesome name={'car'} color={'black'} size={23} />
            ) : (
              <AntDesign name={'car'} color={'black'} size={20} />
            ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color, size}) =>
            color === 'black' ? (
              <MaterialCommunityIcons
                name={'account'}
                color={'black'}
                size={25}
              />
            ) : (
              <MaterialCommunityIcons
                name={'account-outline'}
                color={'black'}
                size={20}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
