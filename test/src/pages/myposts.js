import React from "react";
import NavBar from "./components/navBar";
import MyPostsList from "./components/mypostslist";
import axios from "axios";
import Loader from "./components/loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

function MyPosts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [badgeId, setBadgeId] = useState("");
  const cookies = new Cookies();
  const userBadge = cookies.get("badge");
  const userBadgeDecoded = jwtDecode(userBadge);

  useEffect(() => {
    setBadgeId(userBadgeDecoded.id);
    if (badgeId !== "") {
      axios
        .get("http://localhost:3001/posts/myPosts", {
          params: { userId: badgeId },
        })
        .then((response) => {
          setListOfPosts(response.data);
          setIsLoading(false);
        });
    }
  }, [badgeId]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div id="posts__Container">
          {listOfPosts.map((post, key) => {
            return <MyPostsList key={key} post={post} />;
          })}
        </div>
      )}
    </>
  );
}

export default MyPosts;
