import { configureStore } from "@reduxjs/toolkit";
import { authorSlice } from "./slice/AuthorSlice";
import createSagaMiddleware from "redux-saga";
import postSaga from "./saga/postSaga";
import postsSlice from "./slice/postSlice"
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer:{
        authorSlice:authorSlice.reducer,
        postsSlice
    },
    middleware:(getDefaultMiddleware )=> getDefaultMiddleware({immutableCheck: false,}).concat(sagaMiddleware)
})

sagaMiddleware.run(postSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch