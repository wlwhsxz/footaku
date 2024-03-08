const { Player, Club } = require("./models/index");
const { CLUB_IDS, TM_URL } = require("../envconfig");
const clubIds = CLUB_IDS.split(", ");

// fetch한 데이터와 DB에 저장된 데이터를 비교하여 업데이트 하는게 좋을까?
// 아니면 지금처럼 fetch한 데이터를 그대로 DB에 저장하는게 좋을까?
const fetchData = async () => {
  const fetchClubPromises = [];
  const fetchPlayerPromises = [];

  // forEach를 사용하여 각 clubId에 대해 비동기 fetch 작업을 설정
  clubIds.forEach((clubId) => {
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

module.exports = { fetchData };
