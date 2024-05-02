const postService = require("../services/postService");
const {
  AppError,
  errorMessageHandler,
} = require("../middlewares/errorHandler");

//[ 포스트 전체 요청 ]
const getAllPosts = async (req, res, next) => {
  console.log("getAllPosts Controller");
  try {
    const { statusCode, message, data } = await postService.getAllPosts();

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { statusCode, message, data } = await postService.getPostById(postId);

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

const createPostComment = async (req, res, next) => {
  try {
    const comment = req.body;
    if (!comment.userId || !comment.content) {
      return res
        .status(400)
        .json({ message: "Missing required comment fields" });
    }

    const { statusCode, message, data } = await postService.createPostComment(
      comment
    );

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPostComment,
};
