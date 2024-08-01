import React, { useState } from "react";
import { like, liked, userIcon } from "../../icons";
import { getCookie } from "../../helperFunction";

const PostComponent = (props) => {
  const [post, setPost] = useState(props.postData);

  const loggedInUser = getCookie("cuserName");

  const handleLikeClick = (unlike) => {
    fetch("https://the-gram-backend.onrender.com/likePost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loggedInUser: loggedInUser,
        postId: post._id,
        unlike,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        if (data.success) {
          setPost(data.postData);
        } else {
        }
      })
      .catch((err) => {
        console.warn("Its error", err);
      });
  };
  return (
    <>
      <div className="postUserProfile">
        {post.photo ? (
          <img className="profilePictureofUser" src={post.photo}></img>
        ) : (
          <div className="profilePictureofUser">{userIcon(20, 20)}</div>
        )}
        <h5 className="userNamePost">{post.userName}</h5>
      </div>
      <img className="homePagePost" src={post.photo}></img>
      <div className="likeCommentShare">
        {post.likes.includes(loggedInUser) ? (
          <button onClick={() => handleLikeClick(true)}>{liked(25, 25)}</button>
        ) : (
          <button onClick={() => handleLikeClick(false)}>{like(25, 25)}</button>
        )}
        {post.likes.length || ""}
      </div>
      <div className="commentSession">
        <h5 className="usernameCommentor">{post.userName}</h5>
        <p className="postComment">{post.caption}</p>
      </div>
      <p className="viewAllComments">View all comments</p>
      <div className="addAComment">
        <img className="photoOnComment" src="story-icon.png" width="5%"></img>
        <input
          className="commentSessionPost"
          type="text"
          placeholder="Add a comment..."
        ></input>
      </div>
    </>
  );
};

export default PostComponent;
