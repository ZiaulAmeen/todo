import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
  "todos/fetchTodo",
  async (user_id) => {
    return await axios
      .post("http://localhost:3000/api/todos/get", {
        user_id,
      })
      .then((res) => res.data.todos);
  }
);

const initialState = {
  loading: true,
  todos: [],
  error: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error.message;
    });
  },
});

const todoReducer = todoSlice.reducer;
export default todoReducer;
