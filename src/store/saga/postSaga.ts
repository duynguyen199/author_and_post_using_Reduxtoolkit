import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../api/axiosConfig";
import {  createAuthorSuccess, fetchPostsSuccess } from "../slice/postSlice";
import type { DPost } from "../../constants/CreateAuthor";


function* fetchPostsStart(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      `/posts?page=${action.payload.page}&limit=${action.payload.limit}&search=${action.payload.search}&status=${action.payload.status}`,
    
    );

    console.log(response)

    yield put(fetchPostsSuccess(response));
  } catch (error) {console.log(error)}
}
function* createPostSaga(action:{type:string; payload:DPost}){
  try {
    const response = yield call(
      axiosInstance.post,
      ("/posts"), action.payload
    )
    console.log(response.data)
    yield put(createAuthorSuccess(response.data))
  } catch (error) {
    console.log(error)
  }
}

export default function* postsSaga() {

  yield takeLatest('posts/fetchPostsStart', fetchPostsStart);
  yield takeLatest("posts/createPostSaga", createPostSaga)
}