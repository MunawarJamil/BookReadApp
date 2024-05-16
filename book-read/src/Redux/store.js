import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "./features/BookSlice";
import { userReducer } from "./features/UserSlice";
export const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
  },
});
