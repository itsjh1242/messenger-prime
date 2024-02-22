import React from "react";
import styles from "../styles/Frame.module.scss";

// IsAuth
import { IsAuth } from "../modules/isAuth";

// Icons
import { IoMdPersonAdd } from "react-icons/io";

// Containers
import Contact from "../components/Contact";

const Frame = () => {
  IsAuth();
  return (
    <>
      <div className={styles.frame}>
        <div className={styles.contact}>
          <p className={styles.title}>Contact</p>
          <div className={styles.search}>
            <IoMdPersonAdd size={20} color="#787878" />
            <input placeholder="Add friends" />
          </div>
          {/* Contact List Container */}
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Frame;
