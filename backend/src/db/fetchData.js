const { Player, Club, Post, Comment } = require("./models/index");
const {
  CLUB_IDS,
  TM_URL,
  YOUTUBE_API_URL,
  YOUTUBE_API_KEY,
} = require("../envconfig");
const clubIds = CLUB_IDS.split(", ");

const fetchClubData = async () => {
  const fetchClubPromises = [];
  const fetchPlayerPromises = [];

  clubIds.forEach((clubId) => {
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

  try {
    const allClubsData = await Promise.all(fetchClubPromises);
    const allPlayersData = await Promise.all(fetchPlayerPromises);
    const flattenedPlayersData = allPlayersData.flatMap((clubData) =>
      clubData.players.map((player) => ({
        ...player,
        updatedAt: clubData.updatedAt,
      }))
    );
    await Club.deleteMany({});
    await Player.deleteMany({});
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
    // 클럽의 기존 youtube.videos와 posts를 초기화
    // await Club.findByIdAndUpdate(club._id, {
    //   $set: { "youtube.videos": [], posts: [] },
    // });

    // await Post.deleteMany({});
    // await Comment.deleteMany({});

    try {
      const response = await fetch(
        `${YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${club.youtube.playlistId}&maxResults=48&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      // 클럽의 기존 비디오 ID 리스트
      const existingVideoIds = club.youtube.videos
        ? club.youtube.videos.map((video) => video.id)
        : [];
      const newVideos = data.items
        .filter(
          (video) =>
            !existingVideoIds.includes(video.snippet.resourceId.videoId)
        )
        .map((video) => ({
          id: video.snippet.resourceId.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url,
          publishedAt: new Date(video.snippet.publishedAt),
        }));

      if (newVideos.length > 0) {
        const postIds = await Promise.all(
          newVideos.map((video) => {
            return Post.findOneAndUpdate(
              { postId: video.id },
              {
                $setOnInsert: {
                  name: `${club.name}`,
                  profileImg: `${club.image}`,
                  postId: `${video.id}`,
                  postTag: "youtube",
                  postType: "club",
                  postOwnerId: club._id,
                  postURL: `https://www.youtube.com/watch?v=${video.id}`,
                  publishedAt: video.publishedAt,
                },
                $set: {
                  content: {
                    postImg: `${video.thumbnail}`,
                    summary: `${video.title}`,
                    comments: [],
                  },
                },
              },
              { upsert: true, new: true }
            ).then((post) => post._id);
          })
        );

        // Club 문서 업데이트
        if (existingVideoIds.length === 0) {
          // youtube.videos 필드가 빈 배열인 경우 전체를 설정
          await Club.findByIdAndUpdate(
            club._id,
            {
              $set: { "youtube.videos": newVideos },
              $addToSet: { posts: { $each: postIds } },
            },
            { new: true, runValidators: true }
          );
        } else {
          // 기존 데이터에 새 비디오 추가
          await Club.findByIdAndUpdate(
            club._id,
            {
              $addToSet: { "youtube.videos": { $each: newVideos } },
              $addToSet: { posts: { $each: postIds } },
            },
            { new: true, runValidators: true }
          );
        }

        console.log("update Posts completed", club.name);
      } else {
        console.log(`No new videos found for club: ${club.name}`);
      }
    } catch (error) {
      console.error("Error in processing YouTube data:", error);
    }
  }
};

module.exports = { fetchClubData, fetchYoutubeData };
