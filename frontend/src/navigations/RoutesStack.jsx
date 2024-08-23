import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useSelector} from 'react-redux';

export const baseurl = 'https://api.injazrent.ae';

const RoutesStack = () => {
  // Select the auth slice from the Redux store
  const authState = useSelector(state => state.auth);

  // Retrieve the access token from the auth state
  const accessToken = authState?.token;

  console.log(accessToken, '.....accessToken');

  return (
    <NavigationContainer>
      {accessToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RoutesStack;
