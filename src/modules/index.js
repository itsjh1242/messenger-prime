import { configureStore } from "@reduxjs/toolkit";

// Slice
import testReducer from "./testReducer";
import contactSlice from "./ContactSlice";
import loginSlice from "./LoginSlice";
import alertSlice from "./AlertSlice";

const store = configureStore({
  reducer: { test: testReducer, contact: contactSlice, login: loginSlice, alert: alertSlice },
});

export default store;
