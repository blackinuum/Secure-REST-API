import React from "react";
import HomePage from "./components/homePage";
import NavBar from "./components/navBar";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";

function Posts() {
  const [user, setUser] = useState({});
  const cookies = new Cookies();
  const jwt = cookies.get("badge");
  const userData = jwtDecode(jwt);

  useEffect(() => {
    setUser(userData);
  }, []);
  return (
    <div id="main__Container">
      <NavBar />
      <HomePage />
    </div>
  );
}

export default Posts;
