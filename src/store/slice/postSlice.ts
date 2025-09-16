import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DPost, PostState } from "../../constants/CreateAuthor";
import { act } from "react";

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
    detailPost: {
      id: 0,
      title: "",
      description: "",
      avatar: "",
      author_id: 0,
    },
  } as PostState,

  reducers: {
    fetchPostsStart(state, action) {
      state.loading = true;
      state.error = null;
    },

    fetchPostsSuccess(state, action) {
      state.posts = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    createPostSaga(state, action) {
      state.loading = true;
      state.error = null;
    },
    createAuthorSuccess(state, action: PayloadAction<DPost>) {
      state.posts.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    createPostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getPostByIdSaga(state, action) {
      state.loading = true;
      state.error = null;
    },
    getPostByIdSuccess(state, action) {
      const { id, title, avatar, author_id,description } = action.payload.data;
      state.detailPost = {
        ...state.detailPost,
        id,
        title,
        avatar,
        author_id,
        description
      };
      state.loading = false;
      state.error = null;
    },
    editPostByIdSaga(state,action){
      state.loading = true;
      state.error = null;
    },
    deletePostByIDSaga(state,action){
      state.loading = true
      state.error = null
    },

  },

});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  createAuthorSuccess,
  createPostSaga,
  createPostFailure,
  getPostByIdSuccess,
  getPostByIdSaga,
  editPostByIdSaga,
  deletePostByIDSaga
} = postsSlice.actions;

export default postsSlice.reducer;
