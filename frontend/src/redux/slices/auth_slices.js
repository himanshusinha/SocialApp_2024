import {createSlice} from '@reduxjs/toolkit';
import {THUNK_STATUS} from '../constants/redux.constant';
import {loginAsyncThunk} from '../asyncThunk/AsyncThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  authStatus: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem('accessToken', action.payload);
    },
    resetAuthState: state => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('accessToken');
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAsyncThunk.pending, state => {
      state.authStatus = THUNK_STATUS.LOADING;
      state.isAuthenticated = false;
    });

    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.authStatus = THUNK_STATUS.SUCCESS;
      state.user = action.payload.data.userName;
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
      AsyncStorage.setItem('accessToken', action.payload.data.token);
    });

    builder.addCase(loginAsyncThunk.rejected, state => {
      state.authStatus = THUNK_STATUS.FAILED;
      state.isAuthenticated = false;
    });
  },
});

export const {setRole, setAccessToken, resetAuthState} = authSlice.actions;
export const selectAuthState = state => state.auth;
export default authSlice.reducer;
