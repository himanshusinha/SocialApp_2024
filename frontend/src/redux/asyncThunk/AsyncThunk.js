import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {
  addCommentService,
  createPostService,
  deleteCommentService,
  getAllCommentService,
  getAllPostsService,
  loginService,
  otpVerifyService,
  signupService,
} from '../services/Services';
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
export const signupAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.SIGN_UP,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await signupService(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const OtpVerifyAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.OTP_VERIFY,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await otpVerifyService(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllPostAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.ALL_POST,
  async ({userId, page, limit}, {rejectWithValue}) => {
    try {
      const response = await getAllPostsService({userId, page, limit});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const getAllCommentAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.POST_COMMENTS,
  async ({postId, page, limit}, {rejectWithValue}) => {
    try {
      const response = await getAllCommentService({postId, page, limit});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const addCommentAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.ADD_COMMENTS,
  async ({postId, userId, comment}, {rejectWithValue}) => {
    try {
      const response = await addCommentService({postId, userId, comment});
      return response;
    } catch (error) {
      console.error('Failed to add comment:', error.message);
      return rejectWithValue(error.message);
    }
  },
);
export const deleteCommentAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.DELETE_COMMENTS,
  async ({userId, commentId}, {rejectWithValue}) => {
    try {
      const response = await deleteCommentService({userId, commentId});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const creatPostAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.CREATE_POSTS,
  async (formData, {rejectWithValue}) => {
    try {
      const data = await createPostService(formData);
      return data;
    } catch (error) {
      console.error('Error in creatPostAsyncThunk:', {
        message: error.message,
        stack: error.stack,
      });
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const changeAppLanguage = createAsyncThunk(
  ASYNC_ROUTES.SAVE_LANGUAGE,
  async (language, {rejectWithValue}) => {
    try {
      await storeData('language', language);
      return language;
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
      return theme;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
