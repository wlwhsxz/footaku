const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const CommentSchema = new Schema({
  userId: {
    type: String,
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
      },
    },
  ],
});

module.exports = CommentSchema;
