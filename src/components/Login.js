import React from "react";
import styles from "../styles/Login.module.scss";

import { useNavigate } from "react-router-dom";

// IsAuth
// import { IsAuth } from "../modules/isAuth";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.frame}>
      <div className={styles.frame_left}>
        <p className={styles.title}>react-redux 사이드 프로젝트</p>
        <p className={styles.subtitle}>Socket 통신을 활용한 실시간 채팅 서비스</p>
      </div>
      <div className={styles.frame_right}>
        <p className={styles.title}>유저 로그인</p>
        <div className={styles.form}>
          <div className={styles.input}>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
          </div>
          <button onClick={() => navigate("/main")}>
            <p>입장</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
