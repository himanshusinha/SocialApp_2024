import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartScreen, HomeScreen, ProductDetailsScreen} from '../screens';
import navigationStrings from './navigationStrings';
import * as Screens from '../screens';
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={navigationStrings.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen
        name={navigationStrings.POST_DETAILS_SCREEN}
        component={Screens.PostDetailScreen}
      />
    </Stack.Navigator>
  );
}
