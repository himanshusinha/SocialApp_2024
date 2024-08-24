import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/auth_slices';
import postReducer from '../slices/post_slice';

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export default rootReducers;
