import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { getCookie } from "../helperFunction";
import { useParams, useNavigate } from "react-router-dom";

const Chat = () => {
  const { chatId, userName, loggedInUser } = useParams();
  const socketUrl = `ws://localhost:3001/chat/${userName}/${loggedInUser}/${chatId}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState([]);

  const handleSendMessage = () => {
    if (content.trim() !== "") {
      sendMessage(content);
      setMessage([
        ...message,
        { sender: loggedInUser, messageContent: content },
      ]);
      setContent("");
    }
  };

  useEffect(() => {
    setMessage([
      ...message,
      ...((lastMessage?.data && JSON.parse(lastMessage.data)) || []),
    ]);
  }, [lastMessage?.data]);

  console.log(
    "lastJsonMessage",
    lastMessage?.data && JSON.parse(lastMessage.data),
  );

  return (
    <div>
      <div className="messageUserNameBackIcon">
        <img className="backIconMessage" src="back-icon.png" width="7%"></img>
        <h3 userName="userNameMessage">username</h3>
      </div>
      <div>Last received message: {lastMessage && lastMessage.message}</div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {message.map((msg) => (
          <div
            style={{
              textAlign: loggedInUser === msg.sender ? "right" : "left",
            }}
          >
            {msg.messageContent}
          </div>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: 10, width: "100%" }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Chat;
