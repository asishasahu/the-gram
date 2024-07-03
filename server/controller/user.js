const postCollection = require("../models/posts");
const followListSchema = require("../models/followList");
const userDetails = require("../models/userDetails");
const postSchema = require("../models/posts");
const chatSchema = require("../models/chat");
const messageSchema = require("../models/message");
const passwordRecoverySchema = require("../models/passwordRecovery");

const OTP_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  USED: "USED",
};

const SIGNUP_VIA = {
  EMAIL: "EMAIL",
  MOBILE: "MOBILE",
};

exports.helloWorld = async (req, res) => {
  const userN = req.query.uname;
  const totalPostCount = await postCollection.find({ userName: userN }).count();
  const totalFollowersCount = await followListSchema
    .find({ userName: userN })
    .count();
  const totalFollowingCount = await followListSchema
    .find({ followed: userN })
    .count();
  res.json({
    totalPosts: totalPostCount,
    totalFollowers: totalFollowersCount,
    totalFollowing: totalFollowingCount,
  });
};

exports.fetchPostByTag = async (req, res) => {
  const nameInsta = req.query.userInfo;
  const userData = await userDetails.findOne({ userName: nameInsta });
  const userProfileName = userData.userName;
  const userInstaName = userData.name;
  const userBio = userData.bio;
  const loggedInUser = req.query.loggedInUser;

  const followObjs = await followListSchema.find({
    userName: loggedInUser,
    followed: nameInsta,
  });

  res.json({
    idName: userProfileName,
    idInfo: userInstaName,
    idBio: userBio,
    isFollowing: followObjs.length ? true : false,
  });
};

exports.fetchMyPhotos = async (req, res) => {
  const postDetails = req.query.postName;
  const allPostsObj = await postSchema.find({ userName: postDetails });
  const allPhotos = allPostsObj.map((i) => {
    return { photo: i.photo, id: i._id };
  });
  res.json({
    totalPhotos: allPhotos,
  });
};

exports.fetchPostData = async (req, res) => {
  const postId = req.query.id;
  const postObj = await postSchema.findOne({ _id: postId });

  res.json({
    postData: postObj,
  });
};

exports.generateOtpMobile = async (req, res) => {
  // step 1 - check for username and mobile if it is present in db

  const userName = req.query.userName;
  const mobile = req.query.mobile;

  const userObj1 = await userDetails.find({ userName: userName });
  const userObj2 = await userDetails.find({ mobile: mobile });

  if (userObj1.length || userObj2.length) {
    res.json({ success: false, error: "Username or mobile already exists" });
  } else {
    // step 2 - generate 4 digit random no

    const otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;

    // step 3 - make a entry in db

    await passwordRecoverySchema.collection.insertOne({
      mobile: mobile,
      otp: String(otp),
      otpStatus: OTP_STATUS.ACTIVE,
      userName: userName,
    });

    // step 4 - send message with otp
    const messageContent = `<#> ${otp} is your the gram code. Dont sharwe it.`;
    console.log(messageContent);
    res.json({ success: true });
  }
};

exports.verifyOtp = async (req, res) => {
  const mobile = req.query.mobile;
  const otp = req.query.otp;

  const otpObj = await passwordRecoverySchema.find({
    mobile: mobile,
    otp: otp,
    otpStatus: OTP_STATUS.ACTIVE,
  });
  if (otpObj.length) {
    // user create
    await userDetails.collection.insertOne({
      mobile: mobile,
      password: "123456",
      userName: otpObj[0].userName,
      signUpVia: SIGNUP_VIA.MOBILE,
      isActive: false,
    });
    // change status to USED
    await passwordRecoverySchema.updateOne(
      {
        mobile: mobile,
        otp: otp,
      },
      {
        otpStatus: OTP_STATUS.USED,
      },
    );
    // success reponse
    res.json({ success: true });
  } else {
    res.json({ success: false, error: "OTP doesn't match" });
  }
};

exports.authenticate = async (req, res) => {
  console.log(req.body);
  const userName = req.body?.userName;
  const password = req.body?.password;
  const userObj = await userDetails.find({
    userName: userName,
    password: password,
  });
  if (userObj.length) {
    res.json({ success: true, message: "Logged in successfully" });
  } else {
    res.json({ success: false, message: "Invalid Credentials" });
  }
};

exports.checkUserExist = async (req, res) => {
  console.log(req.body);
  const userName = req.body?.userName;
  const userExist = await userDetails.find({
    userName: userName,
  });
  if (userExist.length) {
    const otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    await passwordRecoverySchema.collection.insertOne({
      otp: String(otp),
      otpStatus: OTP_STATUS.ACTIVE,
      userName: userName,
    });
    res.json({ success: true, message: "Username already exists" });
  } else {
    res.json({ success: false, message: "Invalid username" });
  }
};

exports.verifyOtpForgetPassword = async (req, res) => {
  const userName = req.body?.userName;
  const otp = req.body?.otp;
  const forgetPassword = await passwordRecoverySchema.find({
    userName: userName,
    otp: otp,
    otpStatus: "ACTIVE",
  });
  if (forgetPassword.length) {
    res.json({ success: true, message: "OTP is correct" });
  } else {
    res.json({ success: false, message: "OTP mismatches" });
  }
};

exports.setNewPassword = async (req, res) => {
  const newpassword = req.body?.newpassword;
  const userName = req.body?.userName;
  const result = await userDetails.updateOne(
    {
      userName: userName,
    },
    {
      password: newpassword,
    },
  );
  if (result.matchedCount) {
    res.json({ success: true, message: "Password set successfully" });
  } else {
    res.json({ success: false, message: "Something went wrong" });
  }
};

exports.searchUsername = async (req, res) => {
  const userName = req.body?.userName;
  const search = await userDetails.find({
    userName: userName,
  });
  if (search.length) {
    res.json({ success: true, message: "Username found" });
  } else {
    res.json({ success: false, message: "Username mismatches" });
  }
};
exports.searchmessage = async (req, res) => {
  const userName = req.query.userName;
  const message = await message.find({
    userName: userName,
  });
  if (message.length) {
    res.json({ success: true, message: "Message found" });
  } else {
    res.json({ success: false, message: "Message not found" });
  }
};

exports.followUser = async (req, res) => {
  const loggedInUser = req.body.loggedInUser;
  const user = req.body.userName;

  const objs = await followListSchema.find({
    userName: loggedInUser,
    followed: user,
  });
  console.log(objs.map((i) => i._id));
  if (objs.length) {
    await followListSchema.deleteMany({
      _id: { $in: objs.map((i) => i._id) },
    });
  } else {
    await followListSchema.collection.insertOne({
      userName: loggedInUser,
      followed: user,
      followedOn: new Date(),
    });
  }
  res.json({ success: true });
};

exports.uploadPhoto = async (req, res) => {
  const photo = req.body.photo;
  const userName = req.body.userName;
  const caption = req.body.caption;
  await postCollection.collection.insertOne({
    photo: photo,
    userName: userName,
    caption: caption,
  });
  res.json({ success: true });
};

exports.fetchChats = async (req, res) => {
  const userName = req.query.userName;
  const chats = await chatSchema.find({
    userName: userName,
  });
  let chatWithMessages = [];
  for (let chat of chats) {
    const message = await messageSchema
      .findOne({ chatId: chat.chatId })
      .sort({ _id: -1 });
    message && chatWithMessages.push(message);
  }
  if (chats.length) {
    res.json({ success: true, chats: chatWithMessages });
  } else {
    res.json({ success: false, message: "Message not found" });
  }
};

exports.createChat = async (req, res) => {
  const loggedInUser = req.body.loggedInUser;
  const senderUser = req.body.userName;
  let chatsOfLoggedInUser = null;
  chatsOfLoggedInUser = await chatSchema.find({
    userName: loggedInUser,
  });
  if (!chatsOfLoggedInUser.length) {
    chatsOfLoggedInUser = await chatSchema.collection.insertOne({
      userName: loggedInUser,
    });
    await chatSchema.updateOne(
      {
        _id: chatsOfLoggedInUser.insertedId,
      },
      {
        chatId: chatsOfLoggedInUser.insertedId,
      },
    );
    // chatsOfLoggedInUser = await chatSchema.collection.insertOne({
    //   userName: senderUser,
    //   chatId: chatsOfLoggedInUser.insertedId,
    // });
    res.json({ success: true, chatId: chatsOfLoggedInUser.insertedId });
  } else {
    console.log({
      userName: senderUser,
      chatId: { $in: chatsOfLoggedInUser.map((ct) => ct.chatId) },
    });
    const chatsOfReciever = await chatSchema.findOne({
      userName: senderUser,
      chatId: { $in: chatsOfLoggedInUser.map((ct) => ct.chatId) },
    });
    console.log("chatsOfReciever", chatsOfReciever);
    if (!chatsOfReciever) {
      chatsOfLoggedInUser = await chatSchema.collection.insertOne({
        userName: loggedInUser,
      });
      await chatSchema.updateOne(
        {
          _id: chatsOfLoggedInUser.insertedId,
        },
        {
          chatId: chatsOfLoggedInUser.insertedId,
        },
      );
      res.json({ success: true, chatId: chatsOfLoggedInUser.insertedId });
    } else {
      res.json({ success: true, chatId: chatsOfReciever.chatId });
    }
  }
};

exports.likePost = async (req, res) => {
  const loggedInUser = req.body.loggedInUser;
  const postId = req.body.postId;
  const unlike = req.body.unlike;
  let updatedObj = {};
  if (unlike) {
    updatedObj = await postCollection.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $pullAll: { likes: [loggedInUser] },
      },
      { new: true },
    );
  } else {
    updatedObj = await postCollection.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { likes: loggedInUser },
      },
      { new: true },
    );
  }

  res.json({ success: true, postData: updatedObj });
};
