import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { getCookie } from "../helperFunction";
import { userIcon } from "../icons";

const Message = () => {
  const feusername = getCookie("cuserName");
  const [chats, setChats] = useState([]);

  const fetchAllChats = () => {
    let url = `http://localhost:3001/fetchChats?userName=${feusername}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setChats(res.chats);
      });
  };

  useEffect(() => fetchAllChats(), []);

  console.log("chats", chats);

  return (
    <div>
      <input className="searchMessage" type="text" placeholder="Search"></input>

      <img
        className="profilePictureonMessage"
        src="story-icon.png"
        width="15%"
      ></img>

      <div className="messageRequest">
        <h5 className="messagesList">Messages</h5>
        <h5 className="requestsList">Requests</h5>
      </div>

      {/* <div className="messageDetails">
          <img src="story-icon.png" width="10%"></img>
          <h5 className="messageByUser">username</h5>
        </div>
        <div className="messageDetailsOne">
          <img src="story-icon.png" width="10%"></img>
          <h5 className="messageByUser">username</h5>
        </div>
        <div className="messageDetailsTwo">
          <img src="story-icon.png" width="10%"></img>
          <h5 className="messageByUser">username</h5>
        </div> */}
      {chats.map((chat) => (
        <div style={{ display: "flex" }}>
          {console.log("inside", chat.sender)}
          {userIcon()}
          <div>
            <div>
              {chat.reciever === feusername ? chat.sender : chat.reciever}
            </div>
            <div>{chat.messageContent}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
