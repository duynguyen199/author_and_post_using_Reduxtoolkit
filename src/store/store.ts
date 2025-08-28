import { configureStore } from "@reduxjs/toolkit";
import { authorSlice } from "./slice/AuthorSlice";

export const store = configureStore({
    reducer:{
        authorSlice:authorSlice.reducer
    }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch