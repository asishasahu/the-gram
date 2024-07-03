const mongoose = require("mongoose");
const tagsSchema = new mongoose.Schema({
  postId: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
  tagName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 300,
  },
});

module.exports = mongoose.model("tags", tagsSchema);
