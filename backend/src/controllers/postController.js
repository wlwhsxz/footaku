const postService = require("../services/postService");
const {
  AppError,
  errorMessageHandler,
} = require("../middlewares/errorHandler");

//[ 포스트 전체 요청 ]
const getAllPosts = async (req, res, next) => {
  if (error) {
    const message = errorMessageHandler(error);
    return next(new AppError(400, message));
  }

  try {
    const { statusCode, message, data } = await postService.getAllPosts();
    console.log(data);

    if (statusCode !== 201) return next(new AppError(statusCode, message));

    res.status(201).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

module.exports = {
  getAllPosts,
};
