const mongoose = require("mongoose");

const UserSchema = require("../schemas/userSchema");
const PostSchema = require("../schemas/postSchema");
const ChatSchema = require("../schemas/chatSchema");
const PlayerSchema = require("../schemas/playerSchema");
const ClubSchema = require("../schemas/clubSchema");
const CommentSchema = require("../schemas/commentSchema");

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Chat = mongoose.model("Chat", ChatSchema);
const Player = mongoose.model("Player", PlayerSchema);
const Club = mongoose.model("Club", ClubSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  User,
  Post,
  Chat,
  Player,
  Club,
  Comment,
};
