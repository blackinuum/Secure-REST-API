import React from 'react';
import { useState,useEffect } from "react";
import useSound from "use-sound";
import likeSound from "../../assets/audios/mixkit-select-click-1109.wav";
import axios from 'axios';
import unlikeSound from "../../assets/audios/mixkit-game-quick-warning-notification-268.wav";
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import {format} from "date-fns";

const Post = ({post , liked}) => {
    const [postLiked, setPostLiked] = useState(false);
    const [postsList , setPostsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});    
    const [badgeId,setBadgeId] = useState('');
    const [localPost, setLocalPost] = useState(post.likes);
    const cookies = new Cookies();
    const userBadge = cookies.get("badge");

    useEffect(()=> {
        const userBadgeDecoded = jwtDecode(userBadge);
        const decodedBadgeId = userBadgeDecoded.id;

        setBadgeId(decodedBadgeId);
        setData({
          postId: post.id,
          userId: decodedBadgeId
        });
        liked.some((liked_post) => liked_post.id === post.id) ? setPostLiked(true) : setPostLiked(false);
      },[liked , post.id , userBadge])

    const isoDate = post.createdAt;
    const formattedDate = format(new Date(isoDate) , 'EEEE, dd MMMM yyyy');
    const [like] = useSound(likeSound);
    const [unlike] = useSound(unlikeSound);
    const [seed, setSeed] = useState(1);
    const likePost = () => {
      like();
      axios.post("http://localhost:3001/postslikes/addPostLike", data).then((response)=>{
          if (response.data === 1){
            post.likes++;
            setLocalPost(post.likes);
          }
          console.log(post.likes);
      });
      setPostLiked(true);
    };
    const unLikePost = () => {
      unlike();
      axios.post("http://localhost:3001/postslikes/addPostLike", data).then((response)=>{
       if(response.data === 0){
        post.likes--;
        setLocalPost(post.likes);
       }
        console.log(post.likes);
    });
    setPostLiked(false);
    };
  

    return (
        <div id="post__Container">
        <div className="post__Header">
          <h2 className="post__Title">{post.title}</h2>
          <h2 className="post__User">@{post.author.username}</h2>
        </div>
        <div className="post__Body">
          <div className="body">
            {post.body}
          </div>
        </div>
        <div className="post__Footer" key={seed}>
          <div className="interact__section">
            <div className="post__reacts">
              {        
                postLiked ? (
                <img
                  onClick={unLikePost}
                  className="post__icones"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAhBJREFUSEvlljGI1EAUhv9/kmjhZXezV9ooFjZne42dIih6HFyhjTaCnTZWJ7aCh40g2GmllSLYXCEqHDYi1yhWNoqVzV1yl+wWa5J5EtldzCXZTdaEE0yVTIb3vf/NP2+G2KeH+8TFvwsWwMBc9zhETPS9zwQkr0oCKBxyFkBG6LlfCMSTqlmoOGo556hxB8QJANYwyECADwa4ysB9n4yJ7ZyMgTUCiwAODOeFAn4SzVtWf/tNXgIZsACWtjtrAG9OXn+5D6EF4voUn9xTgXebQPTnvAxY290XAlmp1XTEM8P3LhWCo5ZzmYIntUKHwUR40ey5z0exx4oTE2nb+Q7gcBNgAF+NwDuWAYdz7VOK6m1D0N9hFdUi/e3N5H2sOG51bkD4oEmwEFdM33uaBtvOKoC7jYLBa2bgPkqBI7t7lZDHjYKJC6bvrafA0ukc0TG/NQgO1UFjnltbQQqcfGjbeSnAciNw4qHhe+Nmk2og0m4f1Vp9BNCqGf5DMV6g77uZ7TQaGG6rVwDMmuCREjnN3s67iS0z+Rm2u2eUlsQEo8Nh1hxCrXje2nVf7w1QeDrVAC+EZsy1N6u/gE+ETgXPWPap0FLgivCBVlzKW9PSazxD2UtDSyseb7Vitw+0yFmrt7NR1v6Vb5k5hqsMraw4R7muqrSwc5UtVXILlVj/tPq7M10eKpe6bGLT5v1/4F+kd9cfzij+HwAAAABJRU5ErkJggg=="
                />
              ) : (
                <img
                  onClick={likePost}
                  className="post__icones"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA2xJREFUSEvNlk2IW1UUx///l2QmL61V0I24ULGiYEVc2I0LxWLp2DqKyAjFuvBjZxd2M5N3E5r6cl+KhQ6Im4LdWEUdUFGpCrUqbqTgwg+QtgyoKxGpCtq8l5c0R+7LHckkeZOPBtoHgbz7zj2/87/n3HMvcYUeXiEurl6wrKxk4tXVOyCSnfG8H0nKoFWSSsWJc7ltIFszW7ee48LCpY1WM1VxpPUchFUB7gaQs04agJwRh0sFz/vGjNWD4H625TDA7QBmrF0TwPcUFvPl4ueDAugDy7FjucYfFw4LcGDDiMnltkiOwItDlL0y24oVK5VWt10fOPSDt0DsNUYE/gJwXIQnk3fK7jbwPIHremDnCS6L4GxnXvsuIV8CcJu1O+GWvGdSwaHWT0N4whqczrfiPaxUou4JcvSoG9WjTwA8aMdP5VvxfJ/dkSOboqh5EsQDxk4oTxWUWlnz9b9iU0TR+dVfAdwkwN9typ2blfp9YCEdPLg5ys4eN9/yrcZzPHTo30F2F7W+0RGeA3ANgFW35N3eBw792kOgnE6iEzlQKKvlaezxuq4tUkzxAW2079tUKn1r09hxH/l6v5Cvmv8O5Z5ZpX6YCrha3U44ZxJflH2uUm+uA9erwRKBmhlsOrhhi+ddmAY4rFZvBpxfOmC+4Kri6+vAodbPQpjkjZSdeaVOTQNc94MnSLxn/e7JK9XZIWvOw1rtFlySn9cq1S15O6cBDqvBl3YHNPO5zPVcXPxnHTjJsw4+EMHjSYGBewul4tuXAw+rwT4Ab3T84bVCydvfV9VmIPT9W8HMdwC2mFRTOJ8vFz+bBG5argg/ApAF8FvcirddW6n8ORCcwLXeAeGntj9PBI/82i6hfGyhLcDZ4ZaWvu4WMPCQsBM/tE0/pvCxUZVHWj9sW6w5WJqmzQ4q1PTTaX3UMYRzbrn4xUbL3gNtkPJo2u7Y8CIQ+cG8dLaCyVME4e40eC8Uwl1uufhVWqBDbyCjwMeF9m2ntOgs/H0AmV7lk0BHBhvDuh88SeKdbjiddqarkBrDlndoVacpr2u9QKFpKk6ivJN784tBecRVKjndRnmG5rjXiVX+roWbz2MpTW0go0RrbyqmFRqlc65Sph+P9YyteM37xZdr92az0pj1vJ/GIlrjicGTwCYursuFXRXg/wB4wXcu0frItQAAAABJRU5ErkJggg=="
                />
              )}
              {localPost}
            </div>
            <div className="post__reacts">
              <img
                className="post__icones"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQpJREFUSEtjZBggwDhA9jKgWryom5ubnTGE8d9/RWo66D8T4/2vjEyrGMKKvsPMhVsssL5f4NfPv2cYGRiUqWkpklk3v/76b8wQV/oVJAa3mGdFT9Z/BoapNLIUbOz///9TvkWWzkW1eHl3w39GxnpaWsz4/3/jl8jShlGLR4Oa6ulsNHGBg5RnNB9TPWkxMIwmrtHERYNkBTHy/3+G9G+RJbPoXS3eYv/DZvouJu8TYYv/MyxkZPj/gNIg+M/IdO8rE+NqrG0u9JILOc9RajE2/Yg2F3KRyfi/52t4aSktLMRoZcJ9TAdLMeOYiYGb1j7F8DH/ii7ljxFld2kZvMhmD5IuDL28C7QHAHGD0B8y3G9vAAAAAElFTkSuQmCC"
              />{" "}
              147k
            </div>
            <div></div>
          </div>
          <div className="date">{formattedDate}</div>
        </div>
      </div>
    )
}
export default Post;