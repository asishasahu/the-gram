import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyUser = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [otp, setOtp] = useState("");
  const handleSubmitClick = () => {
    fetch("http://localhost:3001/verifyOtpForgetPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        otp: otp,
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
          navigate(`/update-password?userName=${params.get("userName")}`);
        } else {
        }
      })
      .catch(function (err) {
        console.warn("Its error", err);
      });
  };

  return (
    <div className="verifyuser">
      <div className="enterConfirmationCode">
        <img className="backArrow" src="back-icon.png" width="7%"></img>
        <h3 className="verify-code">Enter Confirmation Code</h3>
      </div>

      <p className="four-digit-confirmation">
        Enter the 4 digit confirmation code
      </p>
      <input
        className="verificationOtp"
        type="text"
        placeholder="Login code"
        onChange={(e) => setOtp(e.target.value)}
      ></input>
      <br />

      <button className="submitButton-verifyUser" onClick={handleSubmitClick}>
        Submit
      </button>
    </div>
  );
};

export default VerifyUser;
