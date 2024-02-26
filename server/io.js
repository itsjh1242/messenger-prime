const loginController = require("./controllers/loginController");
const contactController = require("./controllers/contactController");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    const sid = socket.id;

    socket.on("login", async ({ uid, upw }, callback) => {
      try {
        const login = await loginController.login(uid, upw, sid);
        return callback({ logined: login });
      } catch (err) {
        console.error("Error in io.on(login): ", err);
        callback({ logined: false });
      }
    });

    socket.on("getContacts", async ({ uid }, callback) => {
      try {
        const contacts = await contactController.getContacts(uid);
        return callback({ contacts });
      } catch (err) {
        console.error("Error in io.on(getContacts): ", err);
      }
    });

    socket.on("addContact", async ({ uid, p_uid }, callback) => {
      try {
        const res = await contactController.addContact(uid, p_uid);
        return callback({ res });
      } catch (err) {
        console.error("Error in io.on(addContact): ", err);
      }
    });

    socket.on("disconnect", async () => {
      await loginController.logout(sid);
    });
  });
};
