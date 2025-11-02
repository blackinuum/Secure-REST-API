import React from "react";

import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import LoginForm from "../pages/components/LoginForm";
import { useEffect, useState } from "react";
import WaitingPage from "../pages/waitingPage";
import axios from "axios";

const PrivateRoute =  ({ children }) => {
  const cookies = new Cookies();
  const badge = cookies.get("badge");
  const [badgeCheck, setBadgeCheck] = useState(false);
  const [verificationValidity , setVerificaitionValidity] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:3001/users/checkUser", null, {
        headers: { badge: badge },
      })
      .then((response) => {
      if (response.data.authorized)
        setBadgeCheck(true);
        setVerificaitionValidity(true);
    });
  }, []);
  if(!verificationValidity) return null;
  return <>{badgeCheck ? children : <Navigate to="/" />}</>;
};
export default PrivateRoute;
