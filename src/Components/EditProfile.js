import React from "react";

function EditProfile() {
  return (
    <div>
      <div className="backIconEditProfile">
        <img className="backIconEdit" src="back-icon.png" width="7%"></img>
        <h4 className="editProfile">Edit Profile</h4>
      </div>
      <div>
        <img
          className="changeProfilePicture"
          src="story-icon.png"
          width="15%"
        ></img>
        <h6 className="editPicture">Edit picture</h6>
      </div>
      <div>
        <input
          className="nameEditProfile"
          type="text"
          placeholder="Name"
        ></input>
        <input
          className="usernameEditProfile"
          type="text"
          placeholder="Username"
        ></input>
        <input className="bioEditProfile" type="text" placeholder="Bio"></input>
      </div>
      <button className="saveEditProfile">Save</button>
    </div>
  );
}

export default EditProfile;
