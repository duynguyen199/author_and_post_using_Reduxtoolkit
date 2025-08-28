import { createSlice } from "@reduxjs/toolkit"
import { handleBuilder } from "../thunk/authorThunk"

export type TInitialState = {
    isLoading:boolean,
    listAuthor:TAuthor[]

}

export type TAuthor = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  id: number; // Ensure _id is included
};

const initialState:TInitialState = {
    isLoading:false,
    listAuthor: []
}

export const authorSlice = createSlice({

    name:"author",
    initialState,
    reducers: {
  },
  extraReducers:(builder)=>handleBuilder(builder)
})

// export const {abb} = authorSlice.actions
export default authorSlice.reducer

