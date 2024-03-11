const bcrypt = require("bcrypt");
const { User, Post } = require("./models/index");

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
    // await User.deleteMany({})
    const exists = await User.findOne();
    exists || (await User.create(dummyUsers));
    console.log("Operation completed successfully.");
  } catch (error) {
    console.error(error);
  }
};

const dummyStories = {
  userId: "user1",
  profileImg: "",
  pictures: [
    {
      DateTime: "2024.02.15T10:24:00",
      src: "",
    },
  ],
};

const dummyPosts = [
  {
    postId: "post1",
    postTag: "news",
    postType: "Club",
    postOwnerId: "148",
    postURL: "https://www.bbc.com/sport/football/68460857",
    likes: [
      {
        userId: "user1",
      },
      {
        userId: "user2",
      },
    ],
    content: {
      postImg:
        "https://ichef.bbci.co.uk/ace/standard/800/cpsprodp…uction/_132881911_gettyimages-2065831438.jpg.webp",
      summary:
        "Tottenham boosted their hopes of a top-four Premier League finish with an emphatic victory over 10-man Aston Villa at Villa Park.",
      comments: [
        {
          userId: "user1",
          content:
            "I think he's right. We need to find our identity and stick to it.",
          likes: ["user2"],
        },
        {
          userId: "user2",
          content: "I agree. We need to find our identity and stick to it.",
          likes: ["user1"],
        },
      ],
    },
  },
];

const insertDummyPosts = async () => {
  try {
    await Post.deleteMany({});
    const exists = await Post.findOne();
    exists || (await Post.create(dummyPosts));
    console.log("Operation completed successfully.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { insertDummyUsers, insertDummyPosts };
