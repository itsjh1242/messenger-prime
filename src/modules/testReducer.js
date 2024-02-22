import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const testSlice = createSlice({
  // Name of the slice
  name: "test",
  //   Initial state
  initialState,
  //   Reducers, => Functions
  reducers: {
    increment(state, action) {
      state.value += action.payload;
    },
    decrement(state, action) {
      state.value -= action.payload;
    },
  },
});

export const testActions = testSlice.actions;
export default testSlice.reducer;
