import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screens from '../screens';
import navigationStrings from './navigationStrings';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.TAB_ROUTES}
        component={Screens.TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.PROFILE_EDIT_SCREEN}
        component={Screens.ProfileEditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.LINK_SCREEN}
        component={Screens.LinkScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.POST_DETAILS_SCREEN}
        component={Screens.PostDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ADD_POST_SCREEN}
        component={Screens.AddPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.CHATS_SCREEN}
        component={Screens.ChatsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.MESSAGE_SCREEN}
        component={Screens.MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.NOTIFICATION_SCREEN}
        component={Screens.NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.HOME_SCREEN}
        component={Screens.HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.PROFILE_SCREEN}
        component={Screens.ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;