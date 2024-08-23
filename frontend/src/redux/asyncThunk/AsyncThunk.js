import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {loginService} from '../services/Services';
import {storeData} from '../../utils/helperFunction';

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

export const changeAppLanguage = createAsyncThunk(
  ASYNC_ROUTES.SAVE_LANGUAGE,
  async (language, {rejectWithValue}) => {
    try {
      await storeData('language', language);
      return language; // This should be the payload returned in the fulfilled case
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeAppTheme = createAsyncThunk(
  ASYNC_ROUTES.SAVE_THEME,
  async (theme, {rejectWithValue}) => {
    try {
      await storeData('theme', theme);
      return theme; // This should be the payload returned in the fulfilled case
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
