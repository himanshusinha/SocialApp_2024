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
    const token = await AsyncStorage.getItem('token');
    console.log('Retrieved Token:', token);

    const config = {
      url: SERVICE_ROUTES.ALL_POSTS,
      method: METHODS.GET,
      params: {userId, page, limit},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await Axios.request(config);
    console.log('API Response:', response);
    return response;
  } catch (err) {
    if (err.response) {
      console.error('API Error Response:', err.response);
    } else if (err.request) {
      console.error('API Error Request:', err.request);
    } else {
      console.error('API Error Message:', err.message);
    }
    throw err;
  }
};

export const addCommentService = async ({postId, userId, comment}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Authentication token is missing');

    const config = {
      url: SERVICE_ROUTES.ADD_COMMENTS, // Your comments endpoint
      method: METHODS.POST,
      data: {postId, userId, comment},
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:3000', // Replace with your actual base URL
    };

    const response = await Axios.request(config);
    console.log('API Response:', response.data);
    return response.data; // Return only the data part
  } catch (err) {
    if (err.response) {
      console.error('API Error Response:', err.response);
    } else if (err.request) {
      console.error('API Error Request:', err.request);
    } else {
      console.error('API Error Message:', err.message);
    }
    throw err; // Re-throw the error to be caught by the thunk
  }
};

export const getAllCommentService = async ({postId, page, limit}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Retrieved Token:', token);

    const config = {
      url: SERVICE_ROUTES.POST_COMMENTS,
      method: METHODS.GET,
      params: {postId, page, limit},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await Axios.request(config);
    console.log('API Response:', response);
    return response;
  } catch (err) {
    if (err.response) {
      console.error('API Error Response:', err.response);
    } else if (err.request) {
      console.error('API Error Request:', err.request);
    } else {
      console.error('API Error Message:', err.message);
    }
    throw err;
  }
};
export const deleteCommentService = async ({userId, commentId}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const response = await Axios.request({
      method: 'DELETE',
      url: SERVICE_ROUTES.DELETE_COMMENTS,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId: userId,
        commentId: commentId,
      },
    });

    console.log('API Response:', response);
    return response;
  } catch (err) {
    if (err.response) {
      console.error('API Error Response:', err.response);
    } else if (err.request) {
      console.error('API Error Request:', err.request);
    } else {
      console.error('API Error Message:', err.message);
    }
    throw err;
  }
};
