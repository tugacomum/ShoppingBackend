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
    required: false,
    default: "https://www.metroworldnews.com.br/resizer/taN9dpaw_SV2B3K0_boH9ukMe-w=/800x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/5WKQSM36ABDAFOI3CZKEDFYULI.png"
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