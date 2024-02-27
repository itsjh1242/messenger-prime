import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Alert.module.scss";
import { alertActions } from "../modules/AlertSlice";

const alertMsg = {
  // 로그인
  login_success: ["로그인 알림", "로그인 하였습니다."],
  wrong_password: ["비밀번호 오류", "비밀번호가 틀렸습니다."],
  // 친구 추가
  empty_input: ["입력란 오류", "상대방 아이디를 입력해주세요."],
  p_uid_not_exist: ["조회 실패", "존재하지 않는 아이디입니다."],
  request_already: ["요청 진행중", "이미 친구 요청을 보냈습니다."],
  already_friend: ["친구 상태", "이미 친구입니다."],
  request_success: ["요청 완료", "친구 요청을 보냈습니다."],
  request_accepted: ["요청 수락", "친구 요청을 수락했습니다."],
};

const Alert = () => {
  const dispatch = useDispatch();
  const visibleSlice = useSelector((state) => state.alert.visible);
  const message = useSelector((state) => state.alert.message);
  const alertRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(alertActions.hide());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, visibleSlice]);

  return (
    <>
      {visibleSlice && (
        <div ref={alertRef} className={styles.alert} role="alert">
          <p className={styles.title}>{alertMsg[message][0]}</p>
          <p className={styles.message}>{alertMsg[message][1]}</p>
        </div>
      )}
    </>
  );
};

export default Alert;
