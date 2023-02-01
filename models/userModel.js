const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  socialMedia: {
    type: String,
  },
  socialMediaLink: {
    type: String,
  },
  followers: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
