import React from "react";

const CreateaPassword = () => {
  return (
    <div className="create-a-password">
      <div className="createAPassword">
        <img
          className="backIconCreatePassword"
          src="back-icon.png"
          width="7%"
        ></img>
        <h3 className="create-password">Create a password</h3>
      </div>
      <p className="points-password">
        Create a password with at least 6 letters or numbers. It should be
        something that others can't guess.
      </p>

      <input
        className="enter-password"
        type="text"
        placeholder="Password"
      ></input>

      <button className="next-button">Next</button>
      <p className="have-an-account">Already have an account?</p>
    </div>
  );
};

export default CreateaPassword;
