// src/redux/slices/auth_slices.js
import {createSlice} from '@reduxjs/toolkit';
import {THUNK_STATUS} from '../constants/redux.constant';
import {loginAsyncThunk, OtpVerifyAsyncThunk} from '../asyncThunk/AsyncThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  authStatus: null,
  userData: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem('accessToken', action.payload); // Store token in AsyncStorage
    },
    setAccessToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem('accessToken', action.payload);
    },
    resetAuthState: state => {
      state.user = null;
      state.token = null;
      state.authStatus = null;
      state.userData = {};
      AsyncStorage.removeItem('accessToken');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsyncThunk.pending, state => {
        state.authStatus = THUNK_STATUS.LOADING;
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        state.authStatus = THUNK_STATUS.SUCCESS;
        state.user = action.payload.data.userName;
        state.token = action.payload.data.token;
        state.userData = action.payload.data.userData;
        AsyncStorage.setItem('accessToken', action.payload.data.token);
      })
      .addCase(loginAsyncThunk.rejected, state => {
        state.authStatus = THUNK_STATUS.FAILED;
        state.token = null; // Ensure token is cleared on failure
      })
      .addCase(OtpVerifyAsyncThunk.pending, state => {
        state.authStatus = THUNK_STATUS.LOADING;
      })
      .addCase(OtpVerifyAsyncThunk.fulfilled, (state, action) => {
        state.authStatus = THUNK_STATUS.SUCCESS;
        state.token = action.payload.data.token;
        AsyncStorage.setItem('accessToken', action.payload.data.token);
      })
      .addCase(OtpVerifyAsyncThunk.rejected, state => {
        state.authStatus = THUNK_STATUS.FAILED;
      });
  },
});

export const {setAuthenticated, setAccessToken, resetAuthState} =
  authSlice.actions;
export const selectAuthState = state => state.auth;
export default authSlice.reducer;
