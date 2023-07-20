import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Account from '../Screens/MyAccount/Index';
import Trip from '../Screens/Trips/Trip';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
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
      <Tab.Screen
        name="Trip"
        component={Trip}
        options={{
          tabBarIcon: ({color, size}) =>
            color === 'black' ? (
              <FontAwesome name={'car'} color={'black'} size={25} />
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
