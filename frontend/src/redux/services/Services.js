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

export const likeDislikeService = async ({postId}) => {
  const userId = await AsyncStorage.getItem('userId');

  console.log('postId:', postId); // Ensure this logs correctly
  console.log('userId:', userId); // Ensure this logs correctly

  if (!postId || !userId) {
    throw new Error('Both postId and userId are required');
  }

  try {
    const token = await AsyncStorage.getItem('token'); // Await token retrieval

    if (!token) {
      throw new Error('Token not found');
    }

    const config = {
      url: SERVICE_ROUTES.LIKE_DISLIKE,
      method: METHODS.POST,
      data: {postId, userId}, // Ensure data is correctly structured
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await Axios.request(config); // Await Axios request
    console.log(response, '.......response from likeDislikeService');
    return response; // Resolve with response directly
  } catch (err) {
    console.error(
      'Error in likeDislikeService:',
      err.response ? err.response.data : err.message,
    ); // Enhanced error logging
    throw err; // Rethrow the error to be caught in the thunk
  }
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
export const myAllPostsService = async ({userId, page, limit}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Retrieved Token:', token);

    const config = {
      url: SERVICE_ROUTES.MY_POSTS,
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

export const getAllCommentsService = async ({postId, page, limit}) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
    if (!token) {
      throw new Error('Token not found');
    }

    const config = {
      url: SERVICE_ROUTES.POST_COMMENTS, // Ensure this is correctly defined in your constants
      method: METHODS.GET, // Ensure this is correctly defined in your constants
      params: {postId, page, limit},
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    };

    const response = await Axios.request(config);
    console.log('API Response:', response); // Log response for debugging
    return response;
  } catch (err) {
    if (err.response) {
      console.error('API Error Response:', err.response);
      throw new Error(
        `API Error: ${err.response.data.message || err.response.statusText}`,
      );
    } else if (err.request) {
      console.error('API Error Request:', err.request);
      throw new Error('API Error: No response received');
    } else {
      console.error('API Error Message:', err.message);
      throw new Error(`API Error: ${err.message}`);
    }
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

export const createPostService = async formData => {
  try {
    // Retrieve the authentication token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    // Ensure the formData includes all required fields
    if (!formData || !(formData instanceof FormData)) {
      throw new Error('Invalid form data');
    }

    // Make the POST request with Axios
    const response = await Axios({
      url: SERVICE_ROUTES.CREATE_POSTS,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      data: formData, // Send the form data
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Detailed error logging
    console.error('Error creating post:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : 'No response data',
      request: error.request ? error.request : 'No request data',
    });

    // Throw the error to be handled by the calling code
    throw error;
  }
};

export const addPostService = async formData => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token not found');

  try {
    const response = await Axios({
      url: SERVICE_ROUTES.ADD_POSTS,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating post:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : 'No response data',
      request: error.request ? error.request : 'No request data',
    });
    throw error;
  }
};
