import React from "react";
import Footer from "./Footer";
const Post = () => {
  return (
    <>
      <div>
        <div className="top-bar">
          <h4 className="close-click-post">X</h4>
          <h5 className="new-post">New post</h5>
          <p className="next">Next</p>
        </div>
      </div>
      <div className="post-photos">
        <p className="upload-photos">
          Post photos from your phone on Instagrams
        </p>
        <p className="upload-editPhotos">
          Post photos you took with your phone on Instagram, automatically save
          your edited photos to your gallery, and more.
        </p>
        <p className="turnOn">Turn on</p>
      </div>
      <hr />
      <div className="upload-recent-photos">
        <h5 className="recents">Recents</h5>
        <img
          className="camera-logo"
          src="/camera-icon.png"
          alt="camera-icon"
          width="7%"
        />
      </div>
      <div>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
        <img src="bird.png" width="25%" height="85px"></img>
      </div>
      <button className="post">POST </button>

      <Footer></Footer>
    </>
  );
};

export default Post;
