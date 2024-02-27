const pool = require("../db");

const contactController = {};

contactController.getContacts = async (uid) => {
  try {
    const contacts = await pool.query(
      "SELECT a.users_uid, a.p_users_uid, a.request, b.online FROM contact AS a LEFT JOIN users AS b ON a.p_users_uid = b.uid WHERE users_uid = ? OR p_users_uid = ? ORDER BY b.online DESC, a.request DESC",
      [uid, uid]
    );
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
    // 상대방이 친구요청을 한 상태인지 확인
    const isRequested = await pool.query("SELECT * FROM contact WHERE users_uid  = ? AND p_users_uid = ?", [p_uid, uid]);
    if (isRequested[0][0]) {
      if (isRequested[0][0].request === 0) {
        await pool.query("UPDATE contact SET request = 1 WHERE users_uid = ? AND p_users_uid = ?", [p_uid, uid]);
        return "request_success";
      }
    }
    // 친구 요청
    await pool.query("INSERT INTO contact (users_uid, p_users_uid, request) VALUES (?, ?, ?)", [uid, p_uid, 0]);
    return "request_success";
  } catch (err) {
    console.error("Error in contactController.addContact: ", err);
  }
};

contactController.acceptRequest = async (uid, p_uid) => {
  try {
    // 친구 요청 상태 변경
    await pool.query("UPDATE contact SET request = 1 WHERE users_uid = ? AND p_users_uid = ?", [p_uid, uid]);
    await pool.query("INSERT INTO contact (users_uid, p_users_uid, request) VALUES (?, ?, ?)", [uid, p_uid, 1]);
    return "accept_success";
  } catch (err) {
    console.error("Error in contactController.acceptRequest: ", err);
  }
};

module.exports = contactController;
