import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DPost, PostState } from "../../constants/CreateAuthor";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    pagination: {
      page: 9,
      limit: 1,
      total: 1,
      pages: 1,
    },
  }as PostState,

  reducers: {
    fetchPostsStart(state, action) {
      state.loading = true;
      state.error = null;
      console.log(action);
    },

    fetchPostsSuccess(state, action) {
      state.posts = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    createPostSaga(state, action) {
      state.loading = true
      state.error = null
    },
    createAuthorSuccess(state, action:PayloadAction<DPost>) {
      state.posts.unshift(action.payload)
      state.loading = false
      state.error = null
    },
    createPostFailure(state, action:PayloadAction<string>){
      state.loading = false
      state.error = action.payload
    }
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  createAuthorSuccess,
  createPostSaga,
  createPostFailure
} = postsSlice.actions;

export default postsSlice.reducer;
