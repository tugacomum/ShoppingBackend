const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  },
}, {
    timestamps: true,
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;