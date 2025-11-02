import React from 'react';
import {format} from 'date-fns';

const MyPostsList = ({post}) => {
    const isoDate = post.createdAt;
    const formattedDate = format(new Date(isoDate) , 'EEEE, dd MMMM yyyy');
    return (
        <div id="post__Container">
        <div className="post__Header">
          <h2 className="post__Title">{post.title}</h2>
        </div>
        <div className="post__Body">
          <div className="body">
            {post.body}
          </div>
        </div>
        <div className="post__Footer">
          <div className="interact__section">
            <div className="post__reacts">
                <img
                  className="post__icones"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA2xJREFUSEvNlk2IW1UUx///l2QmL61V0I24ULGiYEVc2I0LxWLp2DqKyAjFuvBjZxd2M5N3E5r6cl+KhQ6Im4LdWEUdUFGpCrUqbqTgwg+QtgyoKxGpCtq8l5c0R+7LHckkeZOPBtoHgbz7zj2/87/n3HMvcYUeXiEurl6wrKxk4tXVOyCSnfG8H0nKoFWSSsWJc7ltIFszW7ee48LCpY1WM1VxpPUchFUB7gaQs04agJwRh0sFz/vGjNWD4H625TDA7QBmrF0TwPcUFvPl4ueDAugDy7FjucYfFw4LcGDDiMnltkiOwItDlL0y24oVK5VWt10fOPSDt0DsNUYE/gJwXIQnk3fK7jbwPIHremDnCS6L4GxnXvsuIV8CcJu1O+GWvGdSwaHWT0N4whqczrfiPaxUou4JcvSoG9WjTwA8aMdP5VvxfJ/dkSOboqh5EsQDxk4oTxWUWlnz9b9iU0TR+dVfAdwkwN9typ2blfp9YCEdPLg5ys4eN9/yrcZzPHTo30F2F7W+0RGeA3ANgFW35N3eBw792kOgnE6iEzlQKKvlaezxuq4tUkzxAW2079tUKn1r09hxH/l6v5Cvmv8O5Z5ZpX6YCrha3U44ZxJflH2uUm+uA9erwRKBmhlsOrhhi+ddmAY4rFZvBpxfOmC+4Kri6+vAodbPQpjkjZSdeaVOTQNc94MnSLxn/e7JK9XZIWvOw1rtFlySn9cq1S15O6cBDqvBl3YHNPO5zPVcXPxnHTjJsw4+EMHjSYGBewul4tuXAw+rwT4Ab3T84bVCydvfV9VmIPT9W8HMdwC2mFRTOJ8vFz+bBG5argg/ApAF8FvcirddW6n8ORCcwLXeAeGntj9PBI/82i6hfGyhLcDZ4ZaWvu4WMPCQsBM/tE0/pvCxUZVHWj9sW6w5WJqmzQ4q1PTTaX3UMYRzbrn4xUbL3gNtkPJo2u7Y8CIQ+cG8dLaCyVME4e40eC8Uwl1uufhVWqBDbyCjwMeF9m2ntOgs/H0AmV7lk0BHBhvDuh88SeKdbjiddqarkBrDlndoVacpr2u9QKFpKk6ivJN784tBecRVKjndRnmG5rjXiVX+roWbz2MpTW0go0RrbyqmFRqlc65Sph+P9YyteM37xZdr92az0pj1vJ/GIlrjicGTwCYursuFXRXg/wB4wXcu0frItQAAAABJRU5ErkJggg=="
                />
              {post.likes}
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
    );
}
export default MyPostsList;