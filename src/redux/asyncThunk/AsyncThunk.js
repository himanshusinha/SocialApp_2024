import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {loginService} from '../services/Services';

export const loginAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.LOGIN,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await loginService(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
