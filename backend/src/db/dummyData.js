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

const dummyPosts = {
  postId: "post1",
  profileType: "club",
  profileImg: "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
  name: "Tottenham Hotspur",
  likes: 3654321,
  content: {
    postImg:
      "https://cdn.gukjenews.com/news/photo/202311/2849432_2902282_4056.png",
    summary: "This Wednesday night, Korean Derby is on the way!",
    comments: [
      {
        userId: "123456789",
        profileImg:
          "https://i.eurosport.com/2023/08/19/3765640-76602729-640-480.jpg",
        name: "Pape sarr",
        comment: "I'm looking forward to this match so bad!!! OMG!",
      },
      {
        userId: "123456789",
        profileImg:
          "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
        name: "James Maddison",
        comment: "I will give them some bangers!!",
      },
    ],
  },
};

const insertDummyPosts = async () => {
  try {
    // await Post.deleteMany({})
    const exists = await Post.findOne();
    exists || (await Post.create(dummyPosts));
    console.log("Operation completed successfully.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { insertDummyUsers, insertDummyPosts };
