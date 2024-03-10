const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const PostSchema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  postTag: {
    type: String,
    // required: true,
    enum: ["youtube", "social media", "news", "etc"],
  },
  postType: {
    type: String,
    // required: true,
    enum: ["Club", "Player"],
  },
  postOwnerId: {
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
});

module.exports = PostSchema;
