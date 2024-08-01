import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNewAccount = () => {
  const [uname, setUname] = useState("");
  const [mobile, setMobile] = useState("");

  const [otp, setOTP] = useState("");

  const [loading, setLoading] = useState(false);
  const [askOtp, setAskOtp] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleGenerateOTP = () => {
    setLoading(true);
    let url = `https://the-gram-backend.onrender.com/generateOtp?mobile=${mobile}&userName=${uname}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setAskOtp(true);
        } else {
          setError(res.error);
        }
        setLoading(false);
      });
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    let url = `https://the-gram-backend.onrender.com/verifyOtp?mobile=${mobile}&otp=${otp}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setError("");
          navigate(`/update-password?userName=${uname}`);
        } else {
          setError(res.error);
          setOTP("");
        }
        setLoading(false);
      });
  };

  return (
    <div className="create-new-accounts">
      <div className="create-account-emailaddress">
        <div className="createAccountEmailAddress">
          <img
            className="backIconCreateAccount"
            src="back-icon.png"
            width="7%"
          ></img>
          <h4 className="email-address-information">
            What's your email address?
          </h4>
        </div>
        <p className="enter-email-address">
          Enter the email address at which you can be contacted. No one will see
          this on your profile picture.
        </p>
      </div>
      {!askOtp && (
        <>
          <input
            className="email-address"
            type="text"
            placeholder="Email address"
            onChange={(e) => setUname(e.target.value)}
          ></input>
          <br />
        </>
      )}

      {askOtp && (
        <>
          <input
            className="mobile-number"
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          ></input>
          <br />
        </>
      )}

      <p style={{ color: "red" }}>{error}</p>

      {!loading && (
        <button
          className="btn-next"
          onClick={askOtp ? handleVerifyOTP : handleGenerateOTP}
        >
          Next
        </button>
      )}

      {loading && (
        <button className="btn-next" disable>
          Loading...
        </button>
      )}
      <br />

      <h6 className="have-anAccount">Already have an account?</h6>
    </div>
  );
};

export default CreateNewAccount;
