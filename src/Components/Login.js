import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../helperFunction";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    fetch("http://localhost:3001/authenticate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then(function (response) {
        // The API call was successful!
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function (data) {
        if (data.success) {
          setCookie("cuserName", userName, 1);
          navigate("/my-profile");
        } else {
        }
      })
      .catch(function (err) {
        // There was an error
        console.warn("Something went wrong.", err);
      });
  };

  return (
    <div className="login-details">
      <div className="english">
        <h6>English (India)</h6>
      </div>

      <img
        className="insta-logo"
        src="/instagram-icon.png"
        alt="Instagram-icon"
        width="10%"
      ></img>

      <div>
        <input
          className="login-input"
          type="text"
          value={userName}
          placeholder="Username, email address or mobile number"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          className="login-input"
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="btn-login" onClick={handleLoginClick}>
          Log in
        </button>

        <Link to={"/forget-password"}>
          <p className="forgot-password"> Forgotten Password? </p>
        </Link>
      </div>

      <Link to={"/create-new-account"}>
        <button className="create-new-account">Create new account</button>
      </Link>
    </div>
  );
};

export default Login;
