import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {Image, StyleSheet} from 'react-native';
import * as Screens from '../screens';

import imagePath from '../constants/imagePath';
import navigationStrings from './navigationStrings';

const BottomTab = createBottomTabNavigator();

const TabRoutes = props => {
  return (
    <>
      <BottomTab.Navigator
        tabBar={tabsProps => (
          <>
            <BottomTabBar {...tabsProps} />
          </>
        )}
        initialRouteName={navigationStrings.HOME_SCREEN}
        screenOptions={{
          headerShown: false,
          style: styles.customBottomtabsStyle,
          tabBarActiveTintColor: colors.blackColor,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {backgroundColor: colors.themeColor},
          tabBarShowLabel: false,
        }}>
        <BottomTab.Screen
          name={navigationStrings.HOME_SCREEN}
          component={Screens.HomeScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={{
                    tintColor: focused ? colors.redColor : colors.whiteColor,
                  }}
                  source={imagePath.firstInActiveIcon}
                />
              );
            },
          }}
        />
        <BottomTab.Screen
          name={navigationStrings.SEARCH_SCREEN}
          component={Screens.SearchScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={{
                    tintColor: focused ? colors.redColor : colors.whiteColor,
                  }}
                  source={imagePath.secondInActiveIcon}
                />
              );
            },
          }}
        />
        <BottomTab.Screen
          name={navigationStrings.CREATE_POST_SCREEN}
          component={Screens.CreatePostScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={{
                    tintColor: focused ? colors.redColor : colors.whiteColor,
                  }}
                  source={imagePath.thirdActiveIcon}
                />
              );
            },
            unmountOnBlur: true,
          }}
        />
        <BottomTab.Screen
          name={navigationStrings.NOTIFICATION_SCREEN}
          component={Screens.NotificationScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={{
                    tintColor: focused ? colors.redColor : colors.whiteColor,
                  }}
                  source={imagePath.fourthActiveIcon}
                />
              );
            },
          }}
        />
        <BottomTab.Screen
          name={navigationStrings.PROFILE_SCREEN}
          component={Screens.ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={{
                    tintColor: focused ? colors.redColor : colors.whiteColor,
                  }}
                  source={imagePath.fifthActiveIcon}
                />
              );
            },
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {
    backgroundColor: 'red',
  },
});

export default TabRoutes;
