import React from "react";
import "../../App.css";
import images from "../../constantes/images";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useCookies, CookiesProvider, Cookies } from "react-cookie";
import cookies from "universal-cookie";
import { jwt } from "jwt-decode";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import * as Yup from "yup";
import Sign from "../signIn";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginForm() {
  const login__error = () =>
    toast.error("Invalid Username or Password !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [passwordFieldVisibility, setPasswordFieldVisibility] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["badge"]);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  const showPassword = () => {
    var password = document.getElementsByName("password");
    for (var i = 0; i < password.length; i++) {
      if (password[i].type === "password") password[i].type = "text";
    }
    setPasswordFieldVisibility(true);
  };
  const hidePassword = () => {
    var password = document.getElementsByName("password");
    for (var i = 0; i < password.length; i++) {
      if (password[i].type === "text") password[i].type = "password";
    }
    setPasswordFieldVisibility(false);
  };
  const intialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("*Username* is a required Field !"),
    password: Yup.string()
      .min(10)
      .max(25)
      .required("*Password* is a required Field !"),
  });
  const submitLoginForm = (data) => {
    axios
      .post("http://localhost:3001/users/authentification", data)
      .then((response) => {
        if (!response.data.error) {
          cookies.set("badge", response.data, {
            expires: expirationDate,
          });
          navigate("/Home");
        } else login__error();
      });
  };
  const toSignIn__Form = () => {
    navigate("/signIn");
  };
  return (
    <>
      <ToastContainer transition={Bounce} />
      <div id="login__form">
        <div id="login__formHeader">
          <center>
            <img src={images.logo} alt="logo" id="loginForm__logo" />
          </center>
          <div id="header__end" />
        </div>
        <div id="form__Title">
          <h1>Welcome To Kik !</h1>
        </div>
        <div id="login__formBody">
          <Formik
            initialValues={intialValues}
            onSubmit={submitLoginForm}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="input">
                <label htmlFor="username">Username* : </label>
                <div className="input__container">
                  <Field name="username" className="inputField" type="text" />
                </div>
              </div>
              <div className="Error">
                <ErrorMessage
                  name="username"
                  className="errorMessage"
                  element="span"
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password* : </label>
                <div className="input__container">
                  <Field
                    name="password"
                    className="inputField"
                    type="password"
                  />
                  {passwordFieldVisibility ? (
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA4FJREFUSEvFl09oFFccx7+/md2IDRFie1kSSiWgB+1FpcWDQhAvvTSNZIN/qGbnz3sesqHSHoQWtodcikhJLzPbnUNCNDZW0VJpKyKlHmLNyYNRFA8WKkjbUFKyGtedn0zYCbuzb3ZNYJt3nPd7v8/v/3tDWKdF68RFHXhybGzT0Wx2odUG1YBd131bB34nok8N2z7bSvgKOJfLJbpTqbsAtgJgZj5kSfldq+A1Hhfy+QyYC8ByCspE1G/Y9g+tgNfluAL3KrCyT9Rn2/aPExMT7UvF4kcE7COgxyfSNebnPvC3RvSPDzzSk8mpTCbz1+sYqqzqCLzEzNMg6idgYxOlZQA/E/OoIeVMI9nYdvIcx2CiIOxrXZPQ9RHTNOdVChr2cSTnazHgDiUSew3D+C96uA6cy+W0rq6u9yzLuhUIR8IefHrEzF+0Mf927MSJPz3H2QNNGw66IMaymeLSUm82m12q3q8De657moERAH2mEFcD4UjYXzLzoCXlpWpFnuMMM9GYCs7MZy0pj8aCv3WcA0R0LaxoZj5oSXlF4TmDeYyBOS2ZnApDWXDd8wAGYzw/YgpxLtyLDpCHAN6pOhj08qBh2xcVnodiT1jTdlqW9dRznN1MNBsDnt+0uNidPnnyWbC/Avby+TQzqyaVT0SHDNuejsk5iDlrSPlNZfqV4qqQgE8MIb6uBTvOx0w0HnPILwNbhBB/qOAMfGkJkXNdN6kDgUe6MtfA55YQozXg6TNnNi60tz8A0B1TIEG+VwqquuAYeKYBfQCKDNyMMb6ot7V1DQ0N/VsDruSwkdfjphDHq5VGxyuAewB2KMFEn5m2fbquuIIPQQ93p1LXAfQqvda0/ZZl3WgAVzOB2Y7Ozj3pdDoYqcur/pIoFDajXL4NoCcmZBcAXNCSyV/DC6HJeH0KXX/fNM3H1fqUI9N13ZQG/ELAu3EVCiCo9nSTVnusMX+QkXIuqid2VgdPoOcbNnwFwFZFpqKo5s6OjldmHrCk/F5lfNPHXj6f306+f4qIBgC0KZSUiOhDw7Z/qhRo9a32EsCAKcTl1/Y4Kuh5XgdKpSM+0TYC3gTwFgNvEBHD9x8WX7wYDi+CSM6DqBwOB1BscTXI6aq26p5RzBlDyomWgwNAdc4JuN/R2bkjbKmmOV6VmwrhCnyUEoldhmE8+V88DiGqn4SWexwXsXUDvwKYuo4u5yraGwAAAABJRU5ErkJggg=="
                      className="eye"
                      onClick={hidePassword}
                    />
                  ) : (
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvFJREFUSEvtVk1IFGEYft5xdumi5Q906BL9HSPq4KWLSEXYoYKkQLJ1ZudbUyGkBE/toQ5BZYW4860zbQYhrQmdwgqiop9Thw5SBEKBIJEmVodanX1jzF10nVlHiezgd/qY93nf530fnm++j7BKi1aJF2vE/0z5/1/qnp6e8rCqnkA2uwNElQCq5uQZB/MEFOWDw3xHCDEVRLYlJ+7t7d0Dx+kgoqMA1CWKThPRPQe4aBjGcDGsL7FlWRVwnOsAGoJMUIBhADaparumad+98j2JpZTrS4DnAHaugDSfQsArJRyujUQiPwvrLCJOpVLrnEzmKYBqH9JBVpSeaDT6xI1bplkLolYAh33wQ6NjY3XxeDw7P76I2JKyH8BxryIMnI0KccUrZkt5noG4D3mXLkS7L7FtmhoTWT7Jd3Uh8g1ZUh5zcboQAzm8bZpDTHTAs2nmumgs9iAXy0+cSqU2OJnMJwBlnmZg3qXFYm/dmJ1Mppj5lLsnoluaYUTcfa9p7iOiRz6NfxwdG9uakzxPbJtmGxPd8DNTWXm5Wl9f78xNmi7A1buTz571kpKvfjWIuVGLxW7PNpyXScozDHT5Jf2amSltaWn5UYzYtu1Snpn5VuQktOlCdC8gnut2BEC5Z2I2u1dvbn5ZTGpbyhoGZt3usT6Tqm7PnesFrraLT31fF+JIrqCXuSwpHwLY7+MRXYvF7EXmcj+k0+nw1OTkawJ2e/ZMdE43jMteMUvKSwA6PB0NPNMNo4aI3D/a7Fp0jvsSiU3TivIGwEYfyQYJuKYJ8cKNJ5PJQwrzaQAHffAjoenp6sbW1on5cc9fZiqR2OwoymMA24oYJUhoWAmFapqamr4Ugn0vib7u7spMOHyVmE8GYSjAZAlIQFU7l3VJzC9yU8rqLFEnmOsCXIsZZh7IEl0QQrwv1vCS93HexZZVwY7TQMxbGKiiP48Bd40z4D4G3imhUL/fhIGlXoG8y0oJPPGyqgYArxEHEOnvQFZN6t80CxQuMkmnZwAAAABJRU5ErkJggg=="
                      className="eye"
                      onClick={showPassword}
                    />
                  )}
                </div>
              </div>
              <div className="Error">
                <ErrorMessage
                  name="password"
                  className="errorMessage"
                  element="span"
                />
              </div>
              <div className="button__Container">
                <center>
                  <button className="login__button" type="submit">
                    Login
                  </button>
                </center>
              </div>
              <div id="signIn__sectionContainer">
                <div className="singIn__seperator" />
                <h4 id="sign">You are not signed yet ?</h4>
                <div className="singIn__seperator" />
              </div>
            </Form>
          </Formik>
        </div>
        <div id="signIn__Container">
          <button className="signIn__button" onClick={toSignIn__Form}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
