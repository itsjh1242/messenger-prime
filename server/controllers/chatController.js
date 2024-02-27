const pool = require("../db");

const chatController = {};

chatController.getChatRoom = async (uid, p_uid) => {
  try {
    const chat = await pool.query(
      "SELECT a.pid, a.sender, a.receiver, a.message, a.sendAt, b.online FROM chat AS a LEFT JOIN users AS b ON a.receiver = b.uid WHERE (a.sender = ? AND a.receiver = ?) OR (a.sender = ? AND a.receiver = ?) ORDER BY sendAt",
      [uid, p_uid, p_uid, uid]
    );
    return chat[0];
  } catch (err) {
    console.error("Error in chatController.getChatRoom: ", err);
  }
};

chatController.saveChat = async (uid, p_uid, msg) => {
  try {
    await pool.query("INSERT INTO chat (pid, sender, receiver, message) VALUES (?, ?, ?, ?)", [null, uid, p_uid, msg]);
    return "save_success";
  } catch (err) {
    console.error("Error in chatController.saveChat: ", err);
  }
};

module.exports = chatController;
