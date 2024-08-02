const express = require("express");
const mongoose = require("mongoose");
const mainRoute = require("./routes/main");
const cors = require("cors");

const WebSocket = require("ws");
const app = express();
const port = 3001;

const MessageSchema = require("./models/message");
const ChatSchema = require("./models/chat");
const expressWs = require("express-ws")(app);
const clients = {};
const ObjectId = require("mongodb").ObjectId;

app.ws("/chat/:userName/:loggedInUser/:chatId", function (ws, req) {
  const userName = req.url.split("/")[2];
  const loggedInUser = req.url.split("/")[3];
  const chatId = req.url.split("/")[4];
  clients[loggedInUser] = ws;

  const allMsg = async function () {
    const allMessage = await MessageSchema.find({
      chatId: ObjectId.createFromHexString(chatId),
    });
    // console.log("allMessage", allMessage);
    ws.send(JSON.stringify(allMessage));
  };

  allMsg();

  ws.on("message", async function (msg) {
    const chatObjs = await ChatSchema.find({
      chatId: ObjectId.createFromHexString(chatId),
      userName: userName,
    });
    if (!chatObjs.length) {
      await ChatSchema.collection.insertOne({
        chatId: ObjectId.createFromHexString(chatId),
        userName: userName,
      });
    }
    await MessageSchema.collection.insertOne({
      chatId: ObjectId.createFromHexString(chatId),
      messageContent: msg,
      sender: loggedInUser,
      reciever: userName,
    });
    clients?.[userName]?.send(
      JSON.stringify([{ messageContent: msg, sender: loggedInUser }]),
    );
  });
});

app.use(cors());
app.use(express.json());
app.use("/", mainRoute);

mongoose.connect("mongodb+srv://asishasahu:CCQO5U8nvYZBnUne@the-gram-cluster.q1jcp1e.mongodb.net//the-gram-db");

app.use(
  cors({
    origin: "*", // Wildcard is NOT for Production
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
