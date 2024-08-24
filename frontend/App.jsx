import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export const baseurl = 'http://localhost:3000';
import axios from 'axios';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import colors from './src/styles/colors';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
console.disableYellowBox = true;
import FlashMessage from 'react-native-flash-message';
import {persistor, store} from './src/redux/store';
import RoutesStack from './src/navigations/RoutesStack';

const App = () => {
  axios.defaults.baseURL = baseurl;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={true} persistor={persistor}>
          <StatusBar
            backgroundColor={colors.blackColor}
            translucent={true}
            hidden={true}
            barStyle="dark-content"
          />
          <RoutesStack />
        </PersistGate>
        <FlashMessage position="top" />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
