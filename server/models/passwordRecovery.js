const mongoose = require("mongoose");
const passwordRecoverySchema = new mongoose.Schema({
  mobile: {
    type: String,
    trim: true,
    required: true,
    maxlength: 15,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  otp: {
    type: String,
    trim: true,
    required: true,
    maxlength: 4,
  },
  otpStatus: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  newPassword: {
    type: String,
    trim: true,
    required: true,
    maxlength: 6,
  },
  confirmPassword: {
    type: String,
    trim: true,
    required: true,
    maxlength: 6,
  },
});
module.exports = mongoose.model("passwordrecovery", passwordRecoverySchema);
