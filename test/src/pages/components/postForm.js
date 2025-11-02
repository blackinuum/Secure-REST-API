import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast , Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { SignJWT, generateKeyPair , exportJWK} from 'jose';
import {useState, useEffect} from 'react';
//import jws from "jws";


const PostForm = () => {
  const [badgeId,setBadgeId] = useState('');
  const [jws, setJws] = useState("");
  const secret = new TextEncoder().encode("47e3a94b4b638da8dc853cd00c6dd9abb12bc62e50bb284708e2567b66a8d3eb13c182ba9f780832139fcbedfbae01ad2538c72b2c0f65e70ffaddb75095595c93a5bb23454538a31044e076aece2bdabd33efa3698054fe900b2f701371f10269e43df57ce9057b1d061e14a3cb16854c6caf8109238959c755b113d20792fc1c6ffb02bb82125f4463293595d15b66b22ba10f5330abe2bbce07d86dedbb5c6e06c2a32535325fb3f3775f592050832ec22db0e33ab64ca9ab29c3ea7f70c5203e221446bb62bee0eed8e2301249fb25e488144729be2fc9a36d9f6be2898cca2ac0922732f688c0d9d5d5a43dc8694f2eed03abe15e0a0f318793e05fc02a");
  const cookies = new Cookies();
  const userBadge = cookies.get("badge");

  const signPayload = async (payload) => {

    try {
      const signature = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      setJws(signature);
      return jws;
    } catch (error) {
      console.error("Error signing JWS:", error);
    }
  };
  
  useEffect(()=> {
    const userBadgeDecoded = jwtDecode(userBadge);
    setBadgeId(userBadgeDecoded.id);
    console.log(badgeId);
  },[jws])
  
  const navigate = useNavigate();
  const CustomInputComponent = (props) => (
   <textarea name="body" className="post__fields-body" type="text"  />
 );

  const postAdded = () => {
    toast.success('Your post has been added', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const post_err = (mssg) => {
    toast.error(mssg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  if(badgeId === ''){
    return null;
  }
  const initialValue = {
    title: "",
    body: "",
    userId: badgeId,
  };



  const onSubmitPost = async (data) => {
    const signature = await signPayload(data);
    console.log("Here is your signature : "+jws);
    axios.post("http://localhost:3001/posts/addPost", {data , signature : signature}
    ).then((response) => {
      if(response.data.success){
        navigate('/')
      }else{
        post_err(response.data.message);
      }
    });
  };

  return (
    <>
      <ToastContainer transition={Flip}/>
      <div id="newPost__Container">
        <div id="newPost">
          <Formik initialValues={initialValue} onSubmit={onSubmitPost}>
            <Form>
              <div id="newpost__Container-Header">
                <h2 className="newpost__container-Header-text">
                  Creating a new post
                </h2>
              </div>
              <div id="newPost__Content">
                <div id="newPost__title">
                  <div className="post__input">
                    <Field
                      name="title"
                      className="post__fields-title"
                      type="text"
                      placeholder="Your Post's title ..."
                    />
                  </div>
                  <ErrorMessage name="title" element="span" />
                </div>
                <div id="newPost__separator" />
                <div id="newPost__Body">
                  <div className="post__input">
                    <Field
                      name="body"
                      as="textarea"
                      className="post__fields-body"
                      type="text"
                      placeholder="Your Post's Content ..."
                    />
                  </div>
                  <ErrorMessage name="body" element="span" />
                </div>
                <div id="newPost__Footer">
                  <button type="submit" id="newPost__submitButton">
                    Post
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
export default PostForm;
