const { Club } = require("../db/models/index");
const { AppError } = require("../middlewares/errorHandler");

//[ 포스트 전체 요청 ]
const getAllClubs = async () => {
  console.log("getAllClubs Service");
  try {
    const foundClubs = await Club.find();
    return {
      statusCode: 200,
      message: "클럽 전체 요청 성공",
      data: foundClubs,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const getAllYoutubeVideos = async () => {
  try {
    const foundClubs = await Club.find();

    return {
      statusCode: 200,
      message: "유튜브 비디오 전체 요청 성공",
      data: youtubeVideos,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const getClubByName = async (clubName) => {
  try {
    const foundClubs = await Club.find({});
    const filteredClub = foundClubs.filter((club) =>
      club.name.toLocaleLowerCase().includes(clubName)
    );

    if (!foundClubs) {
      return {
        statusCode: 404,
        message: "포스트를 찾을 수 없습니다.",
      };
    }
    return {
      statusCode: 200,
      message: "포스트 조회 성공",
      data: filteredClub,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const getYoutubeVideos = async (clubName, _id) => {};

module.exports = {
  getAllClubs,
  getAllYoutubeVideos,
  getClubByName,
};
