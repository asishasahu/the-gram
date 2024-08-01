import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helperFunction";

function NewPost() {
  const [image, setImage] = useState();
  const [caption, setCapion] = useState();
  const loggedInUser = getCookie("cuserName");
  const navigate = useNavigate();

  const handleShareClick = () => {
    fetch("https://the-gram-backend.onrender.com/uploadPhoto", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        photo: image,
        userName: loggedInUser,
        caption: caption,
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
          navigate(`/`);
        } else {
        }
      })
      .catch((err) => {
        console.warn("Its error", err);
      });
  };

  return (
    <div className="new-posts">
      <div className="flex-newPost">
        <img className="backlogIcon" src="backlog-icon.png" width="7%"></img>
        <h3 className="new-post-caption">New Post</h3>
      </div>
      <input
        type="file"
        accept="image"
        className="image-accept"
        onChange={(e) => setImage(e.target.files[0].name)}
      ></input>
      <img className="new-post-photo" src={image}></img>
      <input
        className="caption-placeholder"
        type="text"
        placeholder="Write a caption..."
        onChange={(e) => setCapion(e.target.value)}
      ></input>
      <button className="share-button" onClick={handleShareClick}>
        Share
      </button>
    </div>
  );
}

export default NewPost;
