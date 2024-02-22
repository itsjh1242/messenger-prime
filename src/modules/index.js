import { configureStore } from "@reduxjs/toolkit";

// Slice
import testReducer from "./testReducer";
import contactSlice from "./ContactSlice";
import loginSlice from "./LoginSlice";

const store = configureStore({
  reducer: { test: testReducer, contact: contactSlice, login: loginSlice },
});

export default store;
