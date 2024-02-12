const bcrypt = require("bcrypt");
const { User } = require("./models/index");

const dummyUsers = [
  {
    userId: "user1",
    password: bcrypt.hashSync("password1", 10),
    email: "user1@example.com",
    userName: "JohnDoe",
    role: "user",
    tokens: {
      accessToken: "dummy_access_token_1",
      refreshToken: "dummy_refresh_token_1",
    },
  },
  {
    userId: "admin1",
    password: bcrypt.hashSync("password1", 10),
    email: "admin1@example.com",
    userName: "JaneDoe",
    role: "admin",
    tokens: {
      accessToken: "dummy_access_token_2",
      refreshToken: "dummy_refresh_token_2",
    },
  },
  {
    userId: "user2",
    password: bcrypt.hashSync("password2", 10),
    email: "user2@example.com",
    userName: "Alice",
    role: "user",
    tokens: {
      accessToken: "dummy_access_token_3",
      refreshToken: "dummy_refresh_token_3",
    },
  },
  {
    userId: "admin2",
    password: bcrypt.hashSync("password2", 10),
    email: "admin2@example.com",
    userName: "Bob",
    role: "admin",
    tokens: {
      accessToken: "dummy_access_token_4",
      refreshToken: "dummy_refresh_token_4",
    },
  },
  {
    userId: "user3",
    password: bcrypt.hashSync("password3", 10),
    email: "user3@example.com",
    userName: "Eve",
    role: "user",
    tokens: {
      accessToken: "dummy_access_token_5",
      refreshToken: "dummy_refresh_token_5",
    },
  },
];

const insertDummyUsers = async () => {
  try {
    await User.deleteMany({});
    await User.create(dummyUsers);
    console.log("Dummy users inserted successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { insertDummyUsers };
