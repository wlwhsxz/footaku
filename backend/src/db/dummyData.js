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
    profileType: "club",
    profileImg: "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
    name: "Tottenham Hotspur",
    likes: 36321,
    content: {
      postImg:
        "https://cdn.gukjenews.com/news/photo/202311/2849432_2902282_4056.png",
      summary: "This Wednesday night, Korean Derby is on the way!",
      comments: [
        {
          userId: "1",
          profileImg:
            "https://i.eurosport.com/2023/08/19/3765640-76602729-640-480.jpg",
          name: "Pape sarr",
          comment: "I'm looking forward to this match so bad!!! OMG!",
        },
        {
          userId: "2",
          profileImg:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          name: "James Maddison",
          comment: "I will give them some bangers!!",
        },
      ],
    },
  },
  {
    profileType: "club",
    profileImg:
      "https://media.licdn.com/dms/image/D4D0BAQHpEoGtV7g9cQ/company-logo_200_200/0/1680629968838/fc_barcelona_logo?e=1717027200&v=beta&t=RThBlWUwa4XecRYmt1Y-v_vFDBDWXLP_i2QoqS0LHJ0",
    name: "FC Barcelona",
    likes: 536521,
    content: {
      postImg:
        "https://www.fcbarcelona.com/fcbarcelona/photo/2023/11/12/fd3efc75-3449-4a0b-b1a6-c76861d3a069/_GP26441.jpg",
      summary: "FC Barcelona 2-1 Alavés: Second half turnaround!",
      comments: [
        {
          userId: "1",
          profileImg:
            "https://i.eurosport.com/2023/08/19/3765640-76602729-640-480.jpg",
          name: "Pape sarr",
          comment: "I'm looking forward to this match so bad!!! OMG!",
        },
        {
          userId: "2",
          profileImg:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          name: "James Maddison",
          comment: "I will give them some bangers!!",
        },
        {
          userId: "3",
          profileImg:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          name: "James Maddison",
          comment: "I will give them some bangers!!",
        },
        {
          userId: "4",
          profileImg:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          name: "James Maddison",
          comment: "I will give them some bangers!!",
        },
        {
          userId: "5",
          profileImg:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          name: "James Maddison",
          comment: "I will give them some bangers!!",
        },
      ],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/znqvfxJF2FVvm5d390TdXYe_YaVLzAAUPHCZQzv2mO_si2Jr_jy7oQVrDwIkEtzR4HxeG9eIOioAkRJI7JxsIWI_2pWWUC1OZ9CA7sr7HZ7opF4qOY657cqFBdc-tyrgAp_cb9BLFbfPUSD_aI2C5Q.webp",
    name: "Lionel Messi",
    likes: 1231785,
    content: {
      postImg: "https://img.sbs.co.kr/newimg/news/20221219/201732259_1280.jpg",
      summary: "아르헨, 프랑스 잡고 36년 만의 우승…메시 '골든볼' 수상",
      comments: [],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/aJuU1nsyRtZCionVEeKrqKo2bnAFGirohe7B2wOTtUeQdFNQF3aulvWQlOrqjmcQC8ln28zFjOuWeBKy3AsKuJasRtMgwMLLvNAUIzKpGLmwdfcUidPmgVXxHVGoqtTp3XxL281OLGlQVW01UWtqFw.webp",
    name: "Cristiano Ronaldo",
    likes: 1231234,
    content: {
      postImg:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1iSQrJ.img?w=293&h=451&m=6",
      summary:
        "정신 나간 호날두, 사우디 팬들 앞에서 연거푸 노골적 '음란 제스처'",
      comments: [],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/aJuU1nsyRtZCionVEeKrqKo2bnAFGirohe7B2wOTtUeQdFNQF3aulvWQlOrqjmcQC8ln28zFjOuWeBKy3AsKuJasRtMgwMLLvNAUIzKpGLmwdfcUidPmgVXxHVGoqtTp3XxL281OLGlQVW01UWtqFw.webp",
    name: "Cristiano Ronaldo",
    likes: 1231234,
    content: {
      postImg:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1iSQrJ.img?w=293&h=451&m=6",
      summary:
        "정신 나간 호날두, 사우디 팬들 앞에서 연거푸 노골적 '음란 제스처'",
      comments: [],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/aJuU1nsyRtZCionVEeKrqKo2bnAFGirohe7B2wOTtUeQdFNQF3aulvWQlOrqjmcQC8ln28zFjOuWeBKy3AsKuJasRtMgwMLLvNAUIzKpGLmwdfcUidPmgVXxHVGoqtTp3XxL281OLGlQVW01UWtqFw.webp",
    name: "Cristiano Ronaldo",
    likes: 1231234,
    content: {
      postImg:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1iSQrJ.img?w=293&h=451&m=6",
      summary:
        "정신 나간 호날두, 사우디 팬들 앞에서 연거푸 노골적 '음란 제스처'",
      comments: [],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/aJuU1nsyRtZCionVEeKrqKo2bnAFGirohe7B2wOTtUeQdFNQF3aulvWQlOrqjmcQC8ln28zFjOuWeBKy3AsKuJasRtMgwMLLvNAUIzKpGLmwdfcUidPmgVXxHVGoqtTp3XxL281OLGlQVW01UWtqFw.webp",
    name: "Cristiano Ronaldo",
    likes: 1231234,
    content: {
      postImg:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1iSQrJ.img?w=293&h=451&m=6",
      summary:
        "정신 나간 호날두, 사우디 팬들 앞에서 연거푸 노골적 '음란 제스처'",
      comments: [],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/aJuU1nsyRtZCionVEeKrqKo2bnAFGirohe7B2wOTtUeQdFNQF3aulvWQlOrqjmcQC8ln28zFjOuWeBKy3AsKuJasRtMgwMLLvNAUIzKpGLmwdfcUidPmgVXxHVGoqtTp3XxL281OLGlQVW01UWtqFw.webp",
    name: "Cristiano Ronaldo",
    likes: 1231234,
    content: {
      postImg:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1iSQrJ.img?w=293&h=451&m=6",
      summary:
        "정신 나간 호날두, 사우디 팬들 앞에서 연거푸 노골적 '음란 제스처'",
      comments: [],
    },
  },
  {
    profileType: "player",
    profileImg:
      "https://i.namu.wiki/i/aJuU1nsyRtZCionVEeKrqKo2bnAFGirohe7B2wOTtUeQdFNQF3aulvWQlOrqjmcQC8ln28zFjOuWeBKy3AsKuJasRtMgwMLLvNAUIzKpGLmwdfcUidPmgVXxHVGoqtTp3XxL281OLGlQVW01UWtqFw.webp",
    name: "Cristiano Ronaldo",
    likes: 1231234,
    content: {
      postImg:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1iSQrJ.img?w=293&h=451&m=6",
      summary:
        "정신 나간 호날두, 사우디 팬들 앞에서 연거푸 노골적 '음란 제스처'",
      comments: [],
    },
  },
  {
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
          userId: "1",
          profileImg:
            "https://i.eurosport.com/2023/08/19/3765640-76602729-640-480.jpg",
          name: "Pape sarr",
          comment: "I'm looking forward to this match so bad!!! OMG!",
        },
        {
          userId: "2",
          profileImg:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0d9415080048079b/649d205c61af7011f2cd574b/James_Maddison_Tottenham_2023-24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          name: "James Maddison",
          comment: "I will give them some bangers!!",
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
