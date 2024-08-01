import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";

const PhotoPost = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});

  const fetchPostDetails = () => {
    let url = `https://the-gram-backend.onrender.com/fetchPostDetails?id=${postId}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setPostData(res.postData);
      });
  };

  useEffect(fetchPostDetails, []);

  console.log(postData.userName);
  return (
    <>
      <div className="post-Details">
        <img
          className="profileIcon"
          src="/story-icon.png"
          alt="profilePicture"
          width="5%"
        />
        <p className="idName">{postData.userName}</p>
      </div>
      <div>
        <img className="birdPhoto" src={postData.photo} alt="bird" />
      </div>
      <div className="postBottomIcons">
        <img
          className="likeLogo"
          src="/like-icon.png"
          alt="likeIcon"
          width="26px"
        />
      </div>
      <div className="likeComment">
        <p className="likedBy">{postData.likes?.length} likes</p>
      </div>
      <div className="commentSession">
        <p>
          <span className="userCaption">
            <p className="usernameDetails">{postData.userName}</p>
          </span>
          <span className="userCaption">
            <p className="cap">{postData.caption}</p>
          </span>
        </p>

        {postData.comments?.map((eachComment) => {
          return (
            <p>
              <span className="viewComments">{eachComment.userName}</span>
              <span className="viewComments">{eachComment.comment}</span>
            </p>
          );
        })}
      </div>

      <Footer></Footer>
    </>
  );
};

export default PhotoPost;
