const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  photo: {
    type: String,
    trim: true,
    required: true,
    maxlength: 3000,
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  likes: {
    type: Array,
  },
});

module.exports = mongoose.model("posts", postSchema);
