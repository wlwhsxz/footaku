const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const commentSchema = require("./commentSchema");

const PostSchema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  postTag: {
    type: String,
    // required: true,
    enum: ["youtube", "social media", "news", "etc"],
  },
  postType: {
    type: String,
    // required: true,
    enum: ["Club", "Player", "League"],
  },
  postOwnerId: {
    type: String,
    // required: true,
  },
  postURL: {
    type: String,
    // required: true,
  },
  likes: [
    {
      userId: {
        type: String,
        ref: "User",
        unique: true,
        required: true,
      },
    },
  ],
  content: {
    postImg: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
});

module.exports = PostSchema;
