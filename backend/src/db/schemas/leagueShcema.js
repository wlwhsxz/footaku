const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  name: String,
  country: String,
  tier: String,
  clubs: [
    {
      type: String,
      ref: "Club",
      required: true,
    },
  ],
});
module.exports = leagueSchema;
