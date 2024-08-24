import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/auth_slices'; // Ensure this is the correct path

const rootReducers = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducers;
