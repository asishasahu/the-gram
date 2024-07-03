import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgottenPassword = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleContinueClick = () => {
    fetch("http://localhost:3001/checkuserexist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
      }),
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
          navigate(`/verifyuser?userName=${userName}`);
        } else {
        }
      })
      .catch(function (err) {
        console.warn("Its error", err);
      });
  };
  return (
    <div className="forgottenAccount">
      <div className="findYourAccount">
        <img className="backIconPost" src="back-icon.png" width="7%"></img>
        <h3 className="find-your-account">Find your account</h3>
      </div>
      <p className="point-findAccount">Enter your username or email address</p>
      <p className="cant-reset-password">Can't reset your password?</p>
      <input
        className="fillUsernameEmail"
        type="text"
        placeholder="Username or email address"
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button className="button-continue" onClick={handleContinueClick}>
        Continue
      </button>
    </div>
  );
};

export default ForgottenPassword;
