import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RoutesStack = () => {
  return (
    <NavigationContainer>
      {false ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RoutesStack;
