const express = require("express");

const {
  helloWorld,
  fetchPostByTag,
  fetchMyPhotos,
  fetchPostData,
  generateOtpMobile,
  verifyOtp,
  authenticate,
  checkUserExist,
  verifyOtpForgetPassword,
  addtostory,
  setNewPassword,
  searchmessage,
  searchUsername,
  followUser,
  uploadPhoto,
  fetchChats,
  createChat,
  likePost,
} = require("../controller/user");

const { searchPostAndProfile, fetchfeed } = require("../controller/search");

const router = express.Router();

router.get("/fetchMyProfile", helloWorld);
router.get("/fetchPostbyTag", fetchPostByTag);
router.get("/fetchMyPhotos", fetchMyPhotos);
router.get("/fetchPostDetails", fetchPostData);
router.get("/generateOtp", generateOtpMobile);
router.get("/verifyOtp", verifyOtp);
router.post("/authenticate", authenticate);
router.post("/checkuserexist", checkUserExist);
router.post("/verifyOtpForgetPassword", verifyOtpForgetPassword);
router.post("/setnewpassword", setNewPassword);
router.post("/searchUsername", searchUsername);
router.get("/searchmessage", searchmessage);
router.get("/search", searchPostAndProfile);
router.post("/follow", followUser);
router.post("/uploadPhoto", uploadPhoto);
router.post("/fetchfeed", fetchfeed);

router.post("/createChat", createChat);
router.get("/fetchChats", fetchChats);

router.post("/likePost", likePost);

module.exports = router;
