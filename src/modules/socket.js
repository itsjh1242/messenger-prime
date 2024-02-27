import { useEffect } from "react";
import socket from "../socketServer";
import { loginActions } from "./LoginSlice";
import { useDispatch } from "react-redux";

const ioMethods = {};

ioMethods.login = async (uid, upw) => {
  return new Promise((resolve, reject) => {
    socket.emit("login", { uid, upw }, (res) => {
      resolve(res.logined);
    });
  });
};

ioMethods.addContact = async (uid, p_uid) => {
  return new Promise((resolve, reject) => {
    socket.emit("addContact", { uid, p_uid }, (res) => {
      resolve(res.res);
    });
  });
};

ioMethods.getContacts = async (uid) => {
  return new Promise((resolve, reject) => {
    socket.emit("getContacts", { uid }, (res) => {
      resolve(res.contacts);
    });
  });
};

ioMethods.acceptRequest = async (uid, p_uid) => {
  return new Promise((resolve, reject) => {
    socket.emit("acceptRequest", { uid, p_uid }, (res) => {
      resolve(res.res);
    });
  });
};

ioMethods.getChatRoom = async (uid, p_uid) => {
  return new Promise((resolve, reject) => {
    socket.emit("getChatRoom", { uid, p_uid }, (res) => {
      resolve(res.res);
    });
  });
};

ioMethods.saveChat = async (uid, p_uid, msg) => {
  return new Promise((resolve, reject) => {
    socket.emit("saveChat", { uid, p_uid, msg }, (res) => {
      resolve(res.res);
    });
  });
};

const useDisconnectHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleDisconnect = () => {
      dispatch(loginActions.logout());
    };

    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("disconnect", handleDisconnect);
    };
  }, [dispatch]);
};

export default ioMethods;
