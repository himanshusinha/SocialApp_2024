// src/api/apiClient.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigations/navigationStrings';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  timeout: 10000, // Timeout for requests
});

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle token expiration (401 error)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Try refreshing the token
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Retry the original request with new token
      }

      // If refresh token fails, navigate to login screen
      const navigation = useNavigation();
      await AsyncStorage.removeItem('token');
      navigation.navigate(navigationStrings.LOGIN_SCREEN);
    }

    return Promise.reject(error);
  },
);

// Function to refresh token
const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const response = await axios.post('http://localhost:3000/refreshToken', {
        refreshToken,
      });
      const {token} = response.data;
      await AsyncStorage.setItem('token', token);
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
};

export default apiClient;
