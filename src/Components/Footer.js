import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="lineTag">
        <hr />
      </div>
      <div className="footerIcons">
        <div>
          <Link to={"/"}>
            <img src="/home-icon.png" alt="homeIcon" width="25px" />
          </Link>
        </div>
        <div>
          <Link to={"/search"}>
            <img src="/search-icon.png" alt="searchIcon" width="25px" />
          </Link>
        </div>
        <div>
          <Link to={"/newpost"}>
            <img src="/post-icon.png" alt="postIcon" width="25px" />
          </Link>
        </div>
        <div>
          <Link to={"/my-profile"}>
            <img
              src="/download.webp"
              alt="profilePic"
              width="30px"
              style={{ borderRadius: "60%" }}
            />
          </Link>
        </div>
      </div>
    </>
  );
};
export default Footer;
