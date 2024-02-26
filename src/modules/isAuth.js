import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function IsAuth() {
  const { isAuth } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === "false" || isAuth === null) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return true;
}
