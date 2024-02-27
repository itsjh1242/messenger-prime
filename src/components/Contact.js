import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Contact.module.scss";

// Modules
import { setCurrentChat } from "../modules/ContactSlice";
import { alertActions } from "../modules/AlertSlice";

// Socket
import ioMethods from "../modules/socket";

// Components of ContactList
const Contact = () => {
  const dispatch = useDispatch();
  const uid = localStorage.getItem("user");
  const [contacts, setContacts] = useState([]);

  // 웹 페이지 로드시 친구 목록 불러오기
  const getContacts = async () => {
    try {
      const respond = await ioMethods.getContacts(uid);
      setContacts([...respond]);
    } catch (err) {
      console.error("Error in getContacts:", err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  // 친구 요청 수락
  const acceptRequest = async (p_uid) => {
    try {
      const respond = await ioMethods.acceptRequest(uid, p_uid);
      dispatch(alertActions.show("request_accepted"));
    } catch (err) {
      console.error("Error in acceptRequest:", err);
    }
  };

  // 연락처 누를 때, 현재 채팅방 변경
  const setChatRoom = (p_uid) => {
    try {
      dispatch(setCurrentChat(p_uid));
    } catch (err) {
      console.error("Error in setChatRoom:", err);
    }
  };

  return (
    <div className={styles.contact_list}>
      {contacts.map((contact, index) => {
        if (contact.p_users_uid === uid && contact.request === 1) return null;
        if (contact.request) {
          return (
            <div key={index} className={styles.contact_item} onClick={() => setChatRoom(contact.p_users_uid)}>
              <div className={styles.avatar}></div>
              <div className={styles.info}>
                <p className={styles.name}>{contact.p_users_uid}</p>
                <p className={styles.msg}>{contact.online ? "온라인" : "오프라인"}</p>
              </div>
            </div>
          );
        } else if (uid === contact.p_users_uid) {
          return (
            <div key={index} className={styles.contact_item}>
              <div className={styles.avatar}></div>
              <div className={styles.info}>
                <p className={styles.name}>{contact.users_uid}</p>
                <p className={styles.req_msg}>친구 추가 요청</p>
              </div>
              <div className={styles.req_accept_box}>
                <button onClick={() => acceptRequest(contact.users_uid)}>수락</button>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.contact_item}>
              <div className={styles.avatar}></div>
              <div className={styles.info}>
                <p className={styles.name}>{contact.p_users_uid}</p>
                <p className={styles.req_msg}>요청 진행중</p>
              </div>
              <div className={styles.req_accept_box}></div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Contact;
