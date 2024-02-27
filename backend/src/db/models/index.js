const mongoose = require("mongoose");

const UserSchema = require("../schemas/userSchema");
const PostSchema = require("../schemas/postSchema");
const ChatSchema = require("../schemas/chatSchema");

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = {
  User,
  Post,
  Chat,
};
