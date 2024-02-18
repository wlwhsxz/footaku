const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const PostSchema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  profileType: {
    type: String,
    required: true,
    enum: ["club", "player"],
  },
  profileImg: {
    type: String,
    required: true,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  content: {
    postImg: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
          ref: "",
        },
        profileImg: {
          type: String,
          required: true,
          default: "",
          ref: "",
        },
        name: {
          type: String,
          required: true,
          default: "",
          ref: "",
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

module.exports = PostSchema;
