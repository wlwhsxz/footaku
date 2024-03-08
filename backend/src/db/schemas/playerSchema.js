const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  id: String,
  name: String,
  position: String,
  dateOfBirth: String,
  age: String,
  nationality: [String],
  height: String,
  foot: String,
  joinedOn: String,
  joined: String,
  signedFrom: String,
  contract: String,
  marketValue: String,
  status: String,
  updatedAt: String,
  posts: [
    {
      type: String,
      ref: "Post",
    },
  ],
});

module.exports = playerSchema;
