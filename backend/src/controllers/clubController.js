const clubService = require("../services/clubService");
const {
  AppError,
  errorMessageHandler,
} = require("../middlewares/errorHandler");

//[ 포스트 전체 요청 ]
const getAllClubs = async (req, res, next) => {
  console.log("getAllClubs Controller");
  try {
    const { statusCode, message, data } = await clubService.getAllClubs();

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

const getClubByName = async (req, res, next) => {
  try {
    const { clubName } = req.params;
    const { statusCode, message, data } = await clubService.getClubByName(
      clubName
    );

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

module.exports = {
  getAllClubs,
  getClubByName,
};
