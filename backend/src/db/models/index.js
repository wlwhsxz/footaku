const mongoose = require("mongoose");

const UserSchema = require("../schemas/userSchema");
const PostSchema = require("../schemas/postSchema");

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

module.exports = {
  User,
  Post,
};
