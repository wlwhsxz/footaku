const { Player, Club, Post } = require("./models/index");
const {
  CLUB_IDS,
  TM_URL,
  YOUTUBE_API_URL,
  YOUTUBE_API_KEY,
} = require("../envconfig");
const clubIds = CLUB_IDS.split(", ");

// fetch한 데이터와 DB에 저장된 데이터를 비교하여 업데이트 하는게 좋을까?
// 아니면 지금처럼 fetch한 데이터를 그대로 DB에 저장하는게 좋을까?
const fetchClubData = async () => {
  const fetchClubPromises = [];
  const fetchPlayerPromises = [];

  // forEach를 사용하여 각 clubId에 대해 비동기 fetch 작업을 설정
  clubIds.forEach((clubId) => {
    console.log(clubId);
    // fetch 작업에 대한 프로미스를 fetchPromises 배열에 추가
    const fetchClubPromise = fetch(`${TM_URL}/clubs/${clubId}/profile`)
      .then((response) => response.json())
      .then((clubsData) => {
        return clubsData;
      });

    const fetchPlayerPromise = fetch(`${TM_URL}/clubs/${clubId}/players`)
      .then((response) => response.json())
      .then((players) => {
        return players;
      });

    fetchClubPromises.push(fetchClubPromise);
    fetchPlayerPromises.push(fetchPlayerPromise);
  });

  // Promise.all을 사용하여 모든 fetch 작업이 완료되기를 기다림
  try {
    const allClubsData = await Promise.all(fetchClubPromises);
    const allPlayersData = await Promise.all(fetchPlayerPromises);
    const flattenedPlayersData = allPlayersData.flatMap((clubData) =>
      clubData.players.map((player) => ({
        ...player,
        updatedAt: clubData.updatedAt,
      }))
    );
    // 기존 데이터 삭제
    await Club.deleteMany({});
    await Player.deleteMany({}); // 기존 데이터 삭제
    // fetch한 모든 데이터를 한 번에 DB에 저장
    await Club.insertMany(allClubsData);
    console.log("All clubs data has been saved successfully.");
    await Player.insertMany(flattenedPlayersData);
    console.log("All players data has been saved successfully.");
  } catch (error) {
    console.error("Error fetching or saving clubs data:", error);
  }
};

const fetchYoutubeData = async () => {
  const clubs = await Club.find();

  for (const club of clubs) {
    try {
      const response = await fetch(
        `${YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${club.youtube.playlistId}&maxResults=48&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      const postIds = await Promise.all(
        data.items.map((video) => {
          return Post.findOneAndUpdate(
            { postId: video.id }, // 조건
            {
              $setOnInsert: {
                name: `${club.name}`,
                profileImg: `${club.image}`,
                postId: `${video.id}`,
                postTag: "youtube",
                postType: "club",
                postOwnerId: club.id,
                postURL: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
              },
              $set: {
                content: {
                  postImg: `${video.snippet.thumbnails.high.url}`,
                  summary: `${video.snippet.title}`,
                  comments: [],
                },
              },
            },
            { upsert: true, new: true } // 옵션
          ).then((post) => post._id); // 생성된 또는 업데이트된 Post의 _id를 반환
        })
      );

      // const clearPostsField = async () => {
      //   try {
      //     // 모든 Club 문서에서 `posts` 배열을 빈 배열로 설정
      //     const result = await Club.updateMany(
      //       {}, // 모든 문서 선택
      //       { $set: { posts: [] } } // `posts` 필드를 빈 배열로 설정
      //     );

      //     console.log("Posts fields cleared in all documents:", result);
      //   } catch (error) {
      //     console.error("Error clearing posts fields:", error);
      //   }
      // };

      // clearPostsField();

      // Club 문서 업데이트
      const updatedClub = await Club.findByIdAndUpdate(
        club._id,
        {
          $set: { "youtube.videos": data.items },
          $push: { posts: { $each: postIds } },
        },
        { new: true, runValidators: true }
      );

      if (updatedClub) {
        console.log("update Posts completed", club.name);
      } else {
        console.log("No document found with that ID.");
      }
    } catch (error) {
      console.error("Error in processing YouTube data:", error);
    }
  }
};

module.exports = { fetchClubData, fetchYoutubeData };
