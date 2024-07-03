import React from "react";

const ConfirmationCode = () => {
  return (
    <div className="enter-confirmation-code">
      <div className="backIconConfirmationCode">
        <img
          className="backIcon-ConfirmationCode"
          src="back-icon.png"
          width="7%"
        ></img>
        <h3 className="confirmation-code">Enter the confirmation code</h3>
      </div>
      <p className="point-confirmationcode">
        To confirm your account, enter the 6-digit code that we sent to
        abc@gmail.com
      </p>
      <input
        className="confirmationcode"
        type="text"
        placeholder="Confirmation code"
      ></input>
      <button className="button-next">Next</button>
      <button className="not-recieve-code">I didn't recieve the code</button>
    </div>
  );
};

export default ConfirmationCode;
