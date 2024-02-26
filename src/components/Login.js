import React, { useRef } from "react";
import styles from "../styles/Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../modules/LoginSlice";
import { alertActions } from "../modules/AlertSlice";

// Socket
import ioMethods from "../modules/socket";



const Login = () => {
  localStorage.setItem("isAuth", false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uidRef = useRef();
  const upwRef = useRef();

  const Login = async () => {
    try {
      const uid = uidRef.current.value;
      const upw = upwRef.current.value;
      const loginRespond = await ioMethods.login(uid, upw);
      if (loginRespond === "login_success") {
        dispatch(loginActions.login(uid)); // 로그인 정보 저장
        dispatch(alertActions.show(loginRespond));
        navigate("/main"); // 로그인 성공 시 채팅 페이지로 이동
      } else {
        dispatch(alertActions.show(loginRespond)); // 로그인 실패 시 Alert 표시
      }
    } catch (err) {
      console.error("Error in Login: ", err);
    }
  };
  return (
    <>
      <div className={styles.frame}>
        <div className={styles.frame_left}>
          <p className={styles.title}>react-redux 사이드 프로젝트</p>
          <p className={styles.subtitle}>Socket 통신을 활용한 실시간 채팅 서비스</p>
        </div>
        <div className={styles.frame_right}>
          <p className={styles.title}>유저 로그인</p>
          <div className={styles.form}>
            <div className={styles.input}>
              <input ref={uidRef} type="text" placeholder="아이디" />
              <input ref={upwRef} type="password" placeholder="비밀번호" />
            </div>
            <button onClick={() => Login()}>
              <p>입장</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
