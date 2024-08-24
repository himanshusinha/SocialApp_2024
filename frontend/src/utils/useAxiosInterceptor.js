import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetAuthState} from '../redux/slices/auth_slices'; // Adjust the import path as needed
import {useDispatch} from 'react-redux';
import {useEffect, useRef} from 'react';

// Hook to set up Axios interceptors
const useAxiosInterceptor = () => {
  const dispatch = useDispatch();
  const axiosInstance = useRef(axios.create()); // Create a ref to hold the Axios instance

  useEffect(() => {
    const instance = axiosInstance.current;
    // Set up request interceptor
    const requestInterceptor = instance.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    // Set up response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          // Handle token expiration
          dispatch(resetAuthState());
          // Optionally navigate to login screen
          // navigation.navigate(navigationStrings.LOGIN_SCREEN);
        }
        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);

  return axiosInstance.current;
};

export default useAxiosInterceptor;
