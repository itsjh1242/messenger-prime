import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: true,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuth = false;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
