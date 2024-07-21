import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import rootReducers from '../slices/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const middleware = [thunk];

const persistedReducer = persistReducer(
  persistConfig,
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {store, persistor};
