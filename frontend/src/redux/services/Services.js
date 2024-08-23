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
