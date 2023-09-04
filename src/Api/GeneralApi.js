import {axios, constants, multiPartAxios} from '../utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class GeneralApiFetch {
  Login(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/login`,
      payload,
    );
    return reponse;
  }
  VerifyOtp(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/verify-otp`,
      payload,
    );
    return reponse;
  }
  ResendOtp(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/resend-otp`,
      payload,
    );
    return reponse;
  }
  Logout(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/logout`,
      payload,
    );
    return reponse;
  }
  Register(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/register`,
      payload,
    );
    return reponse;
  }
  ForgotPassword(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/forgot-password`,
      payload,
    );
    return reponse;
  }
  ResetPassword(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/reset-password`,
      payload,
    );
    return reponse;
  }
  GetDriverCode(payload) {
    const reponse = axios.get(
      `${constants.baseURL}user/get-driver-code`,
      payload,
    );
    return reponse;
  }
 async UpdateProfilePic(payload) {
    var accessToken = await AsyncStorage.getItem('userAccessToken');
    console.log('tokenssssss=======>', accessToken);
    const reponse = multiPartAxios.post(
      `${constants.baseURL}user/update-profile-pic`,
      payload,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    return reponse;
  }

  UpdateProfile(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/update-profile`,
      payload,
    );
    return reponse;
  }
  ChangePassword(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/change-password`,
      payload,
    );
    return reponse;
  }

  GetDriveDetails(payload) {
    const reponse = axios.get(
      `${constants.baseURL}user/get-drive-details`,
      payload,
    );
    return reponse;
  }

  StartTrip(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/start-trip`,
      payload,
    );
    return reponse;
  }
  CancelTrip(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/cancel-trip`,
      payload,
    );
    return reponse;
  }
  UpdateTrip(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/update-trip`,
      payload,
    );
    return reponse;
  }
  EndTrip(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/end-trip`,
      payload,
    );
    return reponse;
  }
  AdminDeleteTrip(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/delete-trip`,
      payload,
    );
    return reponse;
  }
  GetTrips(page) {
    const reponse = axios.get(
      `${constants.baseURL}user/get-trips?page=${page} `,
    );
    return reponse;
  }
  ApproveTrip(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/approve-trip `,
      payload
    );
    return reponse;
  }
  GetHomeData(payload) {
    const reponse = axios.get(
      `${constants.baseURL}user/get-home-data`,
      payload
    );
    return reponse;
  }
  GetDrivers(page) {
    const reponse = axios.get(
      `${constants.baseURL}user/get-drivers?page=${page}`,
    );
    return reponse;
  }
  GetMyWallet(page,id) {
    const reponse = axios.get(
      `${constants.baseURL}user/get-transactions?driver_id=${id}&page=${page}`,
    );
    return reponse;
  }
  DeleteDriver(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/delete-driver`,
      payload
    );
    return reponse;
  }

  AddDriver(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/add-driver`,
      payload
    );
    return reponse;
  }

  AdminUpdateDriver(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/update-driver`,
      payload
    );
    return reponse;
  }
  
  AdminMakeTransaction(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/make-transaction`,
      payload
    );
    return reponse;
  }
  UpdateCustomerSignature(payload) {
    const reponse = axios.post(
      `${constants.baseURL}user/update-customer-signature`,
      payload
    );
    return reponse;
  }

}

export default new GeneralApiFetch();