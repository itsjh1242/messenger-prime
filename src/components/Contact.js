import React, { useState, useEffect } from "react";
import styles from "../styles/Contact.module.scss";

// Socket
import ioMethods from "../modules/socket";

// Components of ContactList
const Contact = () => {
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
  });

  return (
    <div className={styles.contact_list}>
      {contacts.map((contact, index) => {
        return contact.request ? (
          <div key={index} className={styles.contact_item}>
            <div className={styles.avatar}></div>
            <div className={styles.info}>
              <p className={styles.name}>{contact.p_users_uid}</p>
              <p className={styles.msg}>Online</p>
            </div>
            <div className={styles.round_box}>
              <div className={styles.inner}>
                <p>2</p>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} className={styles.contact_item}>
            <div className={styles.avatar}></div>
            <div className={styles.info}>
              <p className={styles.name}>{contact.p_users_uid}</p>
              <p className={styles.req_msg}>친구 추가 요청</p>
            </div>
            <div className={styles.req_accept_box}>
              <button>수락</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;
