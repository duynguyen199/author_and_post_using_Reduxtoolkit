import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import type { TInitialState } from "../slice/AuthorSlice";
import type { TAtuhor } from "../../app/AuthorPage";

export const fetchAuthor = createAsyncThunk("author/fetchAuthor", async () => {
  const res = await fetch(
    "http://localhost:3001/api/v1/authors?page=1&limit=10"
  );
  const authorData = await res.json();
  // Adjust based on actual API response structure
  return Array.isArray(authorData) ? authorData : authorData.data || []; // Fallback to empty array if not an array
});

export const getAuthorById = createAsyncThunk("author/getAuthor", async(id:number)=>{
    const res = await fetch(`http://localhost:3001/api/v1/authors/${id}`)

    return res.json()
})
export const addAuthor = createAsyncThunk(
  "author/addAuthor",
  async (body: TAtuhor) => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/authors", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to add author");
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAuthor = createAsyncThunk(
  "author/delete",
  async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/authors/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      return id; // Trả về ID của tác giả đã xóa
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  }
);


export const editValueChange = createAsyncThunk("author/put", async({id, authorData}: {id:number, authorData:TAtuhor})=>{

    try {
        
        const body ={
            name:authorData.name,
            email:authorData.email,
            bio:authorData.bio,
            avatar:authorData.avatar,
        }
        const res = await fetch(`http://localhost:3001/api/v1/authors/${id}`,{
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)

        })

        if(!res.ok) throw new Error("Update failed")
            return res.json()
    } catch (error) {
        console.log(error)
    }
})
export const handleBuilder = (
  builder: ActionReducerMapBuilder<TInitialState>
) => {
  builder.addCase(fetchAuthor.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchAuthor.fulfilled, (state, action) => {
    state.isLoading = false;
    state.listAuthor = action.payload;
  });
  builder.addCase(fetchAuthor.rejected, (state) => {
    state.isLoading = false;
  });
  builder.addCase(addAuthor.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(addAuthor.fulfilled, (state, action) => {
    state.isLoading = false;
    if (!action.payload)
      throw new Error("No data returned from author created");
  });
  builder.addCase(deleteAuthor.pending, (state) => {
    state.isLoading = true;
  })
  builder.addCase(deleteAuthor.fulfilled, (state, action) => {
    state.isLoading = false;
  });
  builder.addCase(getAuthorById.pending, (state)=>{
    state.isLoading = true

  })
  builder.addCase(getAuthorById.fulfilled,(state,action)=>{
    state.isLoading = false
  })
  builder.addCase(editValueChange.pending, (state,action)=>{
    state.isLoading = true
  })
  builder.addCase(editValueChange.fulfilled, (state,action)=>{
    state.isLoading= false

    // state.listAuthor = action.payloadx   
  })

};
