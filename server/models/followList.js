const mongoose = require("mongoose");
const followListSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
  followed: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
  followedOn: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
});

module.exports = mongoose.model("follow-list", followListSchema);
