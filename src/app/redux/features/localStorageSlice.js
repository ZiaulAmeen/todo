import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
};

const localStorage = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    enterUserId(state, action) {
      state.user_id = action.payload;
    },
  },
});

export const { enterUserId } = localStorage.actions;
export default localStorage.reducer;
