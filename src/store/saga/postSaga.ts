import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../api/axiosConfig";
import {  createAuthorSuccess, fetchPostsSuccess, getPostByIdSuccess } from "../slice/postSlice";
import type { DPost } from "../../constants/CreateAuthor";


function* fetchPostsStart(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      `/posts?page=${action.payload.page}&limit=${action.payload.limit}&search=${action.payload.search}&status=${action.payload.status}`,
    
    );
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
function* getPostByIdSaga(action:{type:string,payload:number}){
    try {
      const response = yield call(
        axiosInstance.get,
        `/posts/${action.payload}`
      )
     yield put(getPostByIdSuccess({data:response.data}))

    } catch (error) {
      console.log(error)
    }
}
function* editPostByIdSaga(action:{type:string, payload:DPost}){
  try {
    const{id,fnc, ...rest} = action.payload
    yield call(
     axiosInstance.put, (`posts/${id}`),rest 
    )
   if (fnc) fnc()
  } catch (error) {
    console.log(error)
  }
}
function* deletePostByIDSaga(action:{type:string, payload:DPost}){
  try {

    const {id, fnc} = action.payload
    yield call(axiosInstance.delete,(`posts/${id}`))
    if(fnc) fnc()

  } catch (error) {
    console.log(error)
  }
}
export default function* postsSaga() {

  yield takeLatest('posts/fetchPostsStart', fetchPostsStart);
  yield takeLatest("posts/createPostSaga", createPostSaga);
  yield takeLatest("posts/getPostByIdSaga", getPostByIdSaga);
  yield takeEvery("posts/editPostByIdSaga",editPostByIdSaga);
  yield takeLatest("posts/deletePostByIDSaga",deletePostByIDSaga)

}