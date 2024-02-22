"use client";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import localStorageReducer from "./features/localStorageSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    localStorage: localStorageReducer,
  },
});
