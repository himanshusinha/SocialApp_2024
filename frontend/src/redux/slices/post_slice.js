import {createSlice} from '@reduxjs/toolkit';
import {getAllPostAsyncThunk} from '../asyncThunk/AsyncThunk';
import {THUNK_STATUS} from '../constants';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  status: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllPostAsyncThunk.pending, state => {
        state.status = THUNK_STATUS.LOADING;
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPostAsyncThunk.fulfilled, (state, action) => {
        console.log('Payload received in fulfilled:', action.payload); // Log payload for debugging

        // Extract posts from the payload and handle possible undefined or null
        const posts = action.payload.data?.data || [];

        state.status = THUNK_STATUS.SUCCESS;
        state.loading = false;
        state.posts = posts;
        console.log(state.posts, '........posts');
      })
      .addCase(getAllPostAsyncThunk.rejected, (state, action) => {
        console.error('Error payload in rejected:', action.payload); // Log error for debugging
        state.status = THUNK_STATUS.FAILED;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
