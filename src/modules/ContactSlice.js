import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const selectChatRoom = (state) => state.contact.currentChat;

export const { setCurrentChat } = contactSlice.actions;
export default contactSlice.reducer;
