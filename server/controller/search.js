const followListSchema = require("../models/followList");
const userDetails = require("../models/userDetails");
const postSchema = require("../models/posts");

exports.searchPostAndProfile = async (req, res) => {
  const keyword = req.query.searchkeyword;
  const acconunts = await userDetails.find({
    userName: { $regex: keyword, $options: "i" },
  });
  res.json({ accounts: acconunts, posts: [] });
};

exports.fetchfeed = async (req, res) => {
  const userName = req.body.loggedInUser;

  const following = await followListSchema.find({ userName: userName });

  const posts = await postSchema.find({
    userName: { $in: following.map((i) => i.followed) },
  });
  res.json({ posts: posts, success: true });
};
