const { Post } = require("../db/models/index");
const { AppError } = require("../middlewares/errorHandler");

//[ 포스트 전체 요청 ]
const getAllPosts = async () => {
  try {
    const foundPosts = await Post.find();
    return {
      statusCode: 200,
      message: "포스트 전체 요청 성공",
      data: foundPosts,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

module.exports = {
  getAllPosts,
};
