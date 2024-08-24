import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants';

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
