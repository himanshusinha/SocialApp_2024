import {createSlice} from '@reduxjs/toolkit';
import {THUNK_STATUS} from '../constants/redux.constant';
import {loginAsyncThunk} from '../asyncThunk/AsyncThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: [],
  accessToken: null,
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
      state.accessToken = action.payload;
      AsyncStorage.setItem('accessToken', action.payload);
    },
    resetAuthState: state => {
      state.user = [];
      state.accessToken = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAsyncThunk.pending, (state, action) => {
      state.authStatus = THUNK_STATUS.LOADING;
      state.isAuthenticated = false;
    });

    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.authStatus = THUNK_STATUS.SUCCESS;
      state.user = action?.payload?.user;
      state.accessToken = action.payload?.token;
      state.isAuthenticated = true;
      AsyncStorage.setItem('accessToken', action.payload.token);
    });

    builder.addCase(loginAsyncThunk.rejected, (state, action) => {
      state.authStatus = THUNK_STATUS.FAILED;
      state.isAuthenticated = false;
    });
  },
});

export const {setRole, setAccessToken, resetAuthState} = authSlice.actions;
export const authState = state => state.auth.authStatus;
export default authSlice.reducer;
