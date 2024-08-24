// src/navigation/RoutesStack.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useSelector} from 'react-redux';
import {selectAuthState} from '../redux/slices/auth_slices';

const RoutesStack = () => {
  const {token} = useSelector(selectAuthState);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RoutesStack;
