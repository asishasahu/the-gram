import React from "react";

const UpdateProfile = () => {
  return (
    <div className="update-profile">
      <input className="editName" type="text" placeholder="Name"></input>
      <br />
      <input className="editBio" type="text" placeholder="Bio"></input>
      <br />

      <div className="editProfile">
        <p className="edit_Profile">Edit Profile</p>
        <img
          className="edit-profile"
          src="/profile-picture-icon.png"
          alt="profile-picture"
          width="7%"
        ></img>
      </div>

      <br />
      <button className="submitProfile">Submit</button>
    </div>
  );
};
export default UpdateProfile;
