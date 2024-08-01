import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCookie } from "../helperFunction";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newpassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [params] = useSearchParams();

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleChangeConfirmNewPassword = (e) => {
    setReenterPassword(e.target.value);
  };
  const clickSubmitChange = () => {
    fetch("https://the-gram-backend.onrender.com/setnewpassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newpassword: newpassword,
        userName: params.get("userName"),
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
          setCookie("cuserName", params.get("userName"), 1);
          navigate("/my-profile");
        } else {
        }
      })
      .catch(function (err) {
        console.warn("Its error", err);
      });
  };

  return (
    <div className="updatePassword">
      <div className="backIconStrongPassword">
        <img className="backIcon-Password" src="back-icon.png" width="7%"></img>
        <h3 className="strongPassword">Create a strong password</h3>
      </div>
      <p className="password-characters">
        Your password must be at least 6 characters
      </p>
      <input
        className="enterNewPassword"
        type="text"
        placeholder="Enter New Password"
        onChange={handleChangeNewPassword}
        value={newpassword}
      ></input>
      <input
        className="reEnterPassword"
        type="text"
        placeholder="Re-enter Password"
        onChange={handleChangeConfirmNewPassword}
        value={reenterPassword}
      ></input>
      <br />
      <button className="submitPassword" onClick={clickSubmitChange}>
        Submit
      </button>
    </div>
  );
};

export default UpdatePassword;
