const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  id: String,
  url: String,
  name: String,
  officialName: String,
  image: String,
  addressLine1: String,
  addressLine2: String,
  addressLine3: String,
  tel: String,
  fax: String,
  website: String,
  foundedOn: String,
  members: String,
  membersDate: String,
  otherSports: [String],
  colors: [String],
  stadiumName: String,
  stadiumSeats: String,
  currentTransferRecord: String,
  currentMarketValue: String,
  squad: {
    size: String,
    averageAge: String,
    foreigners: String,
    nationalTeamPlayers: String,
  },
  league: {
    id: String,
    name: String,
    countryID: String,
    countryName: String,
    tier: String,
  },
  historicalCrests: [String],
  players: [
    {
      type: String,
      ref: "Player",
      required: true,
    },
  ],
  posts: [
    {
      type: String,
      ref: "Post",
    },
  ],
  updatedAt: String,
});

module.exports = clubSchema;
