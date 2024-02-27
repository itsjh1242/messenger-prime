import React, { useRef } from "react";
import styles from "../styles/Frame.module.scss";
import { useDispatch } from "react-redux";

// Modules
import { alertActions } from "../modules/AlertSlice";

// IsAuth
import { IsAuth } from "../modules/isAuth";

// Icons
import { IoMdPersonAdd } from "react-icons/io";

// Containers
import Contact from "../components/Contact";
import Chat from "../components/Chat";

// Socket
import ioMethods from "../modules/socket";

const Frame = () => {
  IsAuth();
  const uid = localStorage.getItem("user");
  const dispatch = useDispatch();
  const inputRef = useRef();

  const AddContact = async (e) => {
    if (e.key !== "Enter") return;
    try {
      const p_uid = inputRef.current.value;
      if (p_uid === "") {
        dispatch(alertActions.show("empty_input"));
      }
      const request = await ioMethods.addContact(uid, p_uid);
      dispatch(alertActions.show(request));
    } catch (err) {
      console.error("Error in AddContact: ", err);
    }
  };
  return (
    <>
      <div className={styles.frame}>
        <div className={styles.contact}>
          <p className={styles.title}>Messenger</p>
          <div className={styles.search}>
            <IoMdPersonAdd size={20} color="#787878" />
            <input ref={inputRef} placeholder="Add friends" onKeyDown={AddContact} />
          </div>
          {/* Contact List Container */}
          <Contact />
        </div>
        <div className={styles.frame_col}>
          <div className={styles.setting}>
            <div className={styles.avatar}></div>
            <p className={styles.name}>{uid}</p>
          </div>
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Frame;
