import React from "react";
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import { useEffect , useState } from "react";
import axios from "axios";

const Logged = ({children}) => {
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

    return (
        <>
            {badgeCheck ? <Navigate to="/Home"/> : children}
        </>
        )
}
export default Logged;