import React from 'react';
import images from "../../constantes/images";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


const NavBar = () => {
  const cookies = new Cookies();
    const navigate = useNavigate();

    const redirect__Home = () => {
        navigate("/Home");
      }
      const redirect__NewPost = () => {
        navigate("/New Post");
      }
      const redirect__MyPosts = () => {
        navigate("/My Posts");
      }
      const redirect__Account = () => {
        navigate("/Account");
      }
      const redirect__login = () => {
        cookies.remove("badge");
        navigate("/");
      }
    return (
        <nav id="nav">
            <img src={images.logo} alt="Logo" id="navBar__logo"/>
            <ul>
                <li onClick={redirect__Home}>Home</li>
                <li onClick={redirect__NewPost}>New Post</li>
                <li onClick={redirect__MyPosts}>My Posts</li>
                <li onClick={redirect__Account}>Account</li>
                <li onClick={redirect__login}>Logout</li>
            </ul>
        </nav>
    );
}

export default NavBar;