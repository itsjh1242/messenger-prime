const pool = require("../db");

const contactController = {};

contactController.getContacts = async (uid) => {
  try {
    const contacts = await pool.query("SELECT * FROM contact WHERE users_uid = ?", [uid]);
    return contacts[0];
  } catch (err) {
    console.error("Error in contactController.getContacts: ", err);
  }
};

contactController.addContact = async (uid, p_uid) => {
  try {
    // p_uid가 존재하는지 확인
    const isExist = await pool.query("SELECT * FROM users WHERE uid = ?", [p_uid]);
    if (!isExist[0][0]) {
      return "p_uid_not_exist";
    }
    // 이미 요청이 있는지 확인 && 이미 친구인지 확인
    const isRequest = await pool.query("SELECT * FROM contact WHERE users_uid = ? AND p_users_uid = ?", [uid, p_uid]);
    if (isRequest[0][0]) {
      if (isRequest[0][0].request === 0) {
        return "request_already";
      }
      return "already_friend";
    }
    // 친구 요청
    await pool.query("INSERT INTO contact (users_uid, p_users_uid, request) VALUES (?, ?, ?)", [uid, p_uid, 0]);
    return "request_success";
  } catch (err) {
    console.error("Error in contactController.addContact: ", err);
  }
};

module.exports = contactController;
