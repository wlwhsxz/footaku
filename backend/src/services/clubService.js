const { Club, User } = require("../db/models/index");
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

const addClubFollower = async (clubName, userId) => {
  clubName = clubName.toLowerCase();

  try {
    const foundClubs = await Club.find({
      name: new RegExp(clubName, "i"), // 대소문자를 구분하지 않음
    });

    const foundUser = await User.findOne({ userId });

    if (foundClubs.length === 0) {
      return {
        statusCode: 404,
        message: "클럽을 찾을 수 없습니다.",
      };
    }

    if (!foundUser) {
      return {
        statusCode: 404,
        message: "유저를 찾을 수 없습니다.",
      };
    }

    const clubToFollow = foundClubs[0];

    if (clubToFollow.followers && !clubToFollow.followers.includes(userId)) {
      clubToFollow.followers.push(userId);
      await clubToFollow.save();
    }

    if (foundUser.followings && !foundUser.followings.includes(clubName)) {
      foundUser.followings.push(clubName);
      await foundUser.save();
    }

    return {
      statusCode: 200,
      message: "팔로잉 성공",
      data: foundUser.followings,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};

const removeClubFollower = async (clubName, userId) => {
  clubName = clubName.toLowerCase();

  try {
    const foundClubs = await Club.find({
      name: new RegExp(clubName, "i"),
    });

    const foundUser = await User.findOne({ userId });

    if (foundClubs.length === 0) {
      return {
        statusCode: 404,
        message: "클럽을 찾을 수 없습니다.",
      };
    }

    if (!foundUser) {
      return {
        statusCode: 404,
        message: "유저를 찾을 수 없습니다.",
      };
    }

    const clubToUnfollow = foundClubs[0];

    if (clubToUnfollow.followers && clubToUnfollow.followers.includes(userId)) {
      clubToUnfollow.followers = clubToUnfollow.followers.filter(
        (follower) => follower !== userId
      );
      await clubToUnfollow.save();
    }

    if (foundUser.followings && foundUser.followings.includes(clubName)) {
      console.log(clubName, foundUser.followings);
      foundUser.followings = foundUser.followings.filter(
        (following) => following !== clubName
      );
      await foundUser.save();
    }

    return {
      statusCode: 200,
      message: "언팔로우 성공",
      data: foundUser.followers,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};

const getYoutubeVideos = async (clubName, _id) => {};

module.exports = {
  getAllClubs,
  getAllYoutubeVideos,
  getClubByName,
  addClubFollower,
  removeClubFollower,
};
