import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
import { getCookie } from "../helperFunction";

const UserProfile = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const loggedInUser = getCookie("cuserName");
  const [userid, setUserid] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [profile, setProfile] = useState("/download.webp");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [post, setPost] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [photos, setPhotos] = useState([]);

  const fetchCountOfPost = () => {
    let url = `http://localhost:3001/fetchMyProfile?uname=${userName}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log("this is server response -->", res.totalPosts);
        console.log("this is server response -->", res.totalFollowers);
        setPost(res.totalPosts);
        setFollowers(res.totalFollowers);
        setFollowing(res.totalFollowing);
      });
  };
  const fetchMyPhotos = () => {
    let url = `http://localhost:3001/fetchMyPhotos?postName=${userName}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setPhotos(res.totalPhotos);
      });
  };
  // map method
  const fetchPostByTag = () => {
    let url = `http://localhost:3001/fetchPostbyTag?userInfo=${userName}&loggedInUser=${loggedInUser}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setUserid(res.idName);
        setName(res.idInfo);
        setBio(res.idBio);
        setIsFollowing(res.isFollowing);
      });
  };

  useEffect(fetchCountOfPost, []);
  useEffect(fetchPostByTag, []);
  useEffect(fetchMyPhotos, []);

  const handleFollowClick = () => {
    fetch("http://localhost:3001/follow", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loggedInUser: loggedInUser,
        userName: userName,
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
          fetchCountOfPost();
          fetchPostByTag();
        } else {
        }
      })
      .catch((err) => {
        console.warn("Its error", err);
      });
  };

  const handleMessageClick = () => {
    fetch("http://localhost:3001/createChat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loggedInUser: loggedInUser,
        userName: userName,
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
          navigate(`/chat/${userName}/${loggedInUser}/${data.chatId}`);
        } else {
        }
      })
      .catch((err) => {
        console.warn("Its error", err);
      });
  };

  return (
    <>
      <div className="profile-topBar">
        <p className="profile-name">{userid}</p>
        <img
          className="threadIcon"
          src="/threads-icon.png"
          alt="threads-icon"
          height="25px"
        />
        <img
          className="postIcon"
          src="/post-icon.png"
          alt="create-icon"
          height="25px"
        />
      </div>

      <div className="profile-post-follow">
        <div className="story-logo">
          <img
            src={profile}
            alt="story-icon"
            width="90%"
            style={{ borderRadius: "60%" }}
          />
        </div>
        <div className="posts">
          <span className="numeric">{post}</span>
          <p className="terms">posts</p>
        </div>
        <div className="followers">
          <span className="numeric">{followers}</span>
          <p className="terms">followers</p>
        </div>
        <div className="following">
          <span className="numeric">{following}</span>
          <p className="terms">following</p>
        </div>
      </div>
      <p className="profileName">{name}</p>
      <p className="bioDetails">{bio}</p>
      <div>
        <div className="btnGroup">
          <button className="btn" onClick={handleFollowClick}>
            {isFollowing ? "Following" : "Follow"}
          </button>

          <button className="btn" onClick={handleMessageClick}>
            Message
          </button>
        </div>
      </div>
      <div className="iconVarities">
        <img className="profileIcons" src="/dot-icon.png" alt="dot-icon" />
        <img className="profileIcons" src="/video-icon.png" alt="video-icon" />
        <img
          className="profileIcons"
          src="/person-icon.png"
          alt="person-icon"
        />
      </div>
      <div class="gallery">
        {photos.map((x) => {
          return (
            <div className="gallery-item">
              <a href={`/my-profile/${x.id}`}>
                <img className="gallery-image" src={x.photo} alt="nice"></img>
              </a>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
