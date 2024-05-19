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

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const { statusCode, message, data } = await postService.likePost(
      postId,
      userId
    );

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.log("error");
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.headers["user-id"];
    console.log("unlikePost Controller");
    console.log(postId, userId);

    const { statusCode, message, data } = await postService.unlikePost(
      postId,
      userId
    );

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

const likePostComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req.body;

    const { statusCode, message, data } = await postService.likePostComment(
      commentId,
      userId
    );

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    res.status(200).json({ message, data });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

const unlikePostComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.headers["user-id"];

    const { statusCode, message, data } = await postService.unlikePostComment(
      commentId,
      userId
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
  likePostComment,
  likePost,
  unlikePost,
  unlikePostComment,
};
