const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    messageContent: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
    },
    sender: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    reciever: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("message", messageSchema);
