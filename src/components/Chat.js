import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/Chat.module.scss";

// Modules
import { selectChatRoom } from "../modules/ContactSlice";
import ioMethods from "../modules/socket";

// Icons
import { RiSendPlane2Line } from "react-icons/ri";

// Socket
import socket from "../socketServer";

const Chat = () => {
  const uid = localStorage.getItem("user");
  const currentChat = useSelector(selectChatRoom);
  const [chats, setChats] = useState([]);
  const textareaRef = useRef("");

  const getChatRoom = async (uid, p_uid) => {
    try {
      const res = await ioMethods.getChatRoom(uid, p_uid);
      setChats([...res]);
    } catch (err) {
      console.error("Error in getChatRoom:", err);
    }
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      getChatRoom(uid, currentChat);
    });
    getChatRoom(uid, currentChat);
  }, [uid, currentChat]);

  useEffect(() => {
    const saveChat = async (e) => {
      if (e.key !== "Enter") return;
      try {
        const res = await ioMethods.saveChat(uid, currentChat, textareaRef.current.value);
        textareaRef.current.value = "";
        // 채팅을 저장한 후에 채팅 내용을 다시 불러옴
        getChatRoom(uid, currentChat);
      } catch (err) {
        console.error("Error in saveChat: ", err);
      }
    };

    // textareaRef.current가 유효한 경우에만 이벤트 핸들러를 등록
    if (textareaRef.current) {
      textareaRef.current.addEventListener("keydown", saveChat);

      // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
      return () => {
        if (textareaRef.current) {
          textareaRef.current.removeEventListener("keydown", saveChat);
        }
      };
    }
  }, [uid, currentChat]);

  return currentChat ? (
    <div className={styles.frame}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.info}>
          <p className={styles.name}>{currentChat}</p>
        </div>
      </div>
      <div className={styles.body}>
        {chats.map((chat, index) => {
          if (chat.sender === uid) {
            return (
              <div className={`${styles.item} ${styles.item_sender}`} key={index}>
                <div className={`${styles.message} ${styles.message_sender}`}>
                  <p>{chat.message}</p>
                </div>
                <div className={styles.avatar}></div>
              </div>
            );
          } else {
            return (
              <div className={`${styles.item} ${styles.item_receiver}`} key={index}>
                <div className={styles.avatar}></div>
                <div className={`${styles.message} ${styles.message_receiver}`}>
                  <p>{chat.message}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.chat_frmae}>
        <div className={styles.chat_box}>
          <textarea ref={textareaRef} className={styles.input_box} placeholder="메시지를 입력하세요..." />
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
