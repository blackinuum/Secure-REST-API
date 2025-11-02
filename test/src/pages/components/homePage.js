import React from "react";
import Post from "./post";
import Loader from "./loader";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import axios from "axios";

const HomePage = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listOfLikedPosts, setListOfLikedPosts] = useState([]);
     const [badgeId,setBadgeId] = useState('');
      const cookies = new Cookies();
      const userBadge = cookies.get("badge");

  useEffect(() => {
    const userBadgeDecoded = jwtDecode(userBadge);
    const decodedBadgeId = userBadgeDecoded.id;
    
    axios.get("http://localhost:3001/posts/postsList").then((response) => {
      setListOfPosts(response.data);
      setIsLoading(false);
    });
    axios
  .get("http://localhost:3001/postslikes/likedPosts" , { 
    params : { userId : decodedBadgeId}
  })
  .then((response) => {
    setListOfLikedPosts(response.data);
    console.log(`This is the id : ${decodedBadgeId}`);
    console.log(listOfLikedPosts);
  })
  .catch((error) => {
    console.error(error);
  });

  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div id="posts__Container">
          {listOfPosts.map((post, key ) => {
            return <Post key={key} post={post} liked={listOfLikedPosts} />;
          })}
        </div>

      )}
    </>
  );
};

export default HomePage;
