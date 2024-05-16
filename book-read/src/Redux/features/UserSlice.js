import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      // Persist the user information in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      (state.user = null), (state.isLoggedIn = false);
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
