const pool = require("../db");

const loginController = {};

loginController.login = async (uid, upw, sid) => {
  try {
    // 해당 유저가 존재하는지 확인
    const isUser = await pool.query("SELECT * FROM users WHERE uid = ?", [uid]);

    if (!isUser[0][0]) {
      // 존재하지 않으면, 새로 생성
      await pool.query("INSERT INTO users (uid, upw, sid) VALUES (?, ?, ?)", [uid, upw, sid]);
    } else if (isUser[0][0].upw !== upw) {
      // 존재하지만 비밀번호가 틀리면
      return "wrong_password";
    }
    await pool.query("UPDATE users SET sid = ?, online = 1 WHERE uid = ?", [sid, uid]);
    return "login_success";
  } catch (err) {
    console.error("Error in loginController.login: ", err);
  }
};

loginController.logout = async (sid) => {
  try {
    await pool.query("UPDATE users SET sid = ?, online = 0 WHERE sid = ?", [null, sid]);
  } catch (err) {
    console.error("Error in loginController.logout: ", err);
  }
};

module.exports = loginController;
