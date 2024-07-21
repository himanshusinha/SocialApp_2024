import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes = () => {
  return (
    <NavigationContainer>
      {!!true ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;