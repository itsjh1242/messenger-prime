import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  isAuth: false,
  online: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.online = true;
      // 로그인 시 로컬 스토리지에 로그인 정보 저장
      localStorage.setItem("user", action.payload);
      localStorage.setItem("uid", action.payload);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("online", true);
    },
    logout: (state) => {
      state.user = {};
      state.isAuth = false;
      state.online = false;
      // 로그아웃 시 로컬 스토리지 초기화
      localStorage.removeItem("user");
      localStorage.removeItem("uid");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("online");
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
