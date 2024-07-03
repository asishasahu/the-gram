const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
    maxlength: 15,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  picture: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  yourstory: {
    type: String,
    trim: true,
    required: false,
    maxlength: 300,
  },
  signUpVia: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("user", userSchema);
