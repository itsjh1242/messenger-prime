import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    show: (state, action) => {
      state.visible = true;
      state.message = action.payload;
    },
    hide: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
