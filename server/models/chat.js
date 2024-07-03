const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 300,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: false,
      maxlength: 300,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("chat", chatSchema);
