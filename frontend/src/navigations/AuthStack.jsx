import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from './navigationStrings';
import * as Screens from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.INITIAL_SCREEN}
        component={Screens.InitialScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.LOGIN_SCREEN}
        component={Screens.LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.SIGNUP_SCREEN}
        component={Screens.SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.OTP_VERIFICATION_SCREEN}
        component={Screens.OtpVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.WEBVIEW_SCREEN}
        component={Screens.WebViewScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.FORGOT_SCREEN}
        component={Screens.ForgotScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
