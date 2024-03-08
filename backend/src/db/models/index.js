const mongoose = require("mongoose");

const UserSchema = require("../schemas/userSchema");
const PostSchema = require("../schemas/postSchema");
const ChatSchema = require("../schemas/chatSchema");
const PlayerSchema = require("../schemas/playerSchema");
const ClubSchema = require("../schemas/clubSchema");

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Chat = mongoose.model("Chat", ChatSchema);
const Player = mongoose.model("Player", PlayerSchema);
const Club = mongoose.model("Club", ClubSchema);

module.exports = {
  User,
  Post,
  Chat,
  Player,
  Club,
};
