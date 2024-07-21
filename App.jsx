import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export const baseurl = 'https://api.injazrent.ae';
import axios from 'axios';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Routes from './src/navigations/Routes';
import {persistor, store} from './src/redux/store';
import {StatusBar} from 'react-native';
import colors from './src/styles/colors';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
console.disableYellowBox = true;

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
          <Routes />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
