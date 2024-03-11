const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const CommentSchema = new Schema({
  userId: {
    type: String, // UUID 형태의 사용자 ID
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      userId: {
        type: String,
        ref: "User",
        required: true,
        unique: true,
      },
    },
  ],
});

module.exports = CommentSchema;
