import React from "react";
import PostForm from "./components/postForm";
import NavBar from "./components/navBar";
const NewPost = () => {
  return (
    <div id="main__newPost-Container">
      <NavBar />
      <PostForm />
    </div>
  );
};
export default NewPost;
