import AsyncStorage from '@react-native-async-storage/async-storage';
import axios1 from 'axios';

export const constants = {
  baseURL: 'https://trip.taxiinthrissur.com/api/v1/',
};
export const axios = axios1.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
export const multiPartAxios = axios1.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

axios.interceptors.request.use(async function (_config) {
  var accessToken = await AsyncStorage.getItem('userAccessToken');
  console.log('tokenssssss', accessToken);
  if (accessToken !== null) {
    _config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return _config;
});

axios.defaults.timeout = 30000;
