import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helperFunction";
import PostComponent from "./UI/posts";

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/fetchfeed", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loggedInUser: getCookie("cuserName"),
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
          setPosts(data.posts);
        } else {
        }
      })
      .catch((err) => {
        console.warn("Its error", err);
      });
  }, []);

  const handleMessageClick = () => {
    fetch("http://localhost:3001/searchmessage", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(function (data) {
          if (data.success) {
            navigate("/searchmessage");
          } else {
          }
        })
        .catch(function (err) {
          console.warn("Its error", err);
        }),
    });
  };
  return (
    <div className="homePageDetails">
      <div className="homePageIcon">
        <Link to={"/instagram"}>
          <img className="logoTextHomePage" src="instagram-text-icon.png"></img>
        </Link>

        <Link to={"/like"}>
          <img className="likeIconHomePage" src="like-icon.png"></img>
        </Link>
        <Link to={"/chat"}>
          <img className="messageIconHomePage" src="message-icon.png"></img>
        </Link>
      </div>
      <img className="yourStoryIcon" src="story-icon.png" width="15%"></img>
      <p className="your-story-text">Your profile</p>
      {posts.map((singlePost) => (
        <PostComponent postData={singlePost} />
      ))}
      <Footer></Footer>
    </div>
  );
}

export default Home;
