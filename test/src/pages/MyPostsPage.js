import React from "react";
import MyPosts from "./myposts";
import NavBar from "./components/navBar";

function MyPostsPage() {
  return (
    <div id="main__Container">
        <NavBar />
        <MyPosts />
    </div>
  );
}

export default MyPostsPage;
