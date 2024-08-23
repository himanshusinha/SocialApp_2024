import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducers from '../slices/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist the 'auth' slice
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
  devTools: composeWithDevTools(),
});

// Create the persistor
const persistor = persistStore(store);

export {store, persistor};
