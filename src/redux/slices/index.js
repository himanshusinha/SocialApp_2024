import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './auth_slices';
export default combineReducers({
  auth: authSlice,
});
