import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginService = data => {
  return new Promise((resolve, reject) => {
    const config = {
      url: SERVICE_ROUTES.LOGIN,
      method: METHODS.POST,
      data,
    };

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from signup services');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const signupService = data => {
  return new Promise((resolve, reject) => {
    const config = {
      url: SERVICE_ROUTES.SIGN_UP,
      method: METHODS.POST,
      data,
    };

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from signup services');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const otpVerifyService = data => {
  return new Promise((resolve, reject) => {
    const config = {
      url: SERVICE_ROUTES.OTP_VERIFY,
      method: METHODS.POST,
      data,
    };

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from signup services');
        resolve(res);
      })
      .catch(err => {
        console.error(err); // Added to log errors more clearly
        reject(err);
      });
  });
};

export const getAllPostsService = async ({userId, page, limit}) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Await token retrieval
    console.log('Retrieved Token:', token); // Log the token for debugging

    const config = {
      url: SERVICE_ROUTES.ALL_POSTS,
      method: METHODS.GET,
      params: {userId, page, limit},
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    };

    const response = await Axios.request(config);
    console.log('API Response:', response); // Debug API response
    return response;
  } catch (err) {
    if (err.response) {
      // Server responded with a status other than 2xx
      console.error('API Error Response:', err.response);
    } else if (err.request) {
      // No response was received from the server
      console.error('API Error Request:', err.request);
    } else {
      // Other errors
      console.error('API Error Message:', err.message);
    }
    throw err; // Re-throw the error to be caught in the thunk
  }
};
