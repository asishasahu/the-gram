import React from "react";

export default function MessageConversation() {
  return (
    <div>
      <div className="usernameMessageHeader">
        <img className="backIconMessage" src="back-icon.png"></img>
        <img className="profilePictureMessage" src="story-icon.png"></img>
        <h4 className="userNameDetails">Username</h4>
      </div>

      <input
        className="messageConversationDetails"
        type="text"
        placeholder="Message..."
      ></input>
    </div>
  );
}
