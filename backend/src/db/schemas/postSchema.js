const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const commentSchema = require("./commentSchema");

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      // required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    postTag: {
      type: String,
      enum: ["youtube", "social media", "news", "etc"],
    },
    postType: {
      type: String,
      enum: ["club", "player", "league"],
    },
    postOwnerId: {
      type: String,
    },
    postURL: {
      type: String,
    },
    publishedAt: Date,
    likes: [
      {
        userId: {
          type: String,
          ref: "User",
          required: function () {
            return this.userId != null;
          }, // Requires userId only if it's not null
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
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PostSchema;
