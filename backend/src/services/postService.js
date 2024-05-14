const { Club, Post, Comment, User } = require("../db/models/index");
const { AppError } = require("../middlewares/errorHandler");
const ObjectId = require("mongoose").Types.ObjectId;

//[ 포스트 전체 요청 ]
const getAllPosts = async () => {
  console.log("getAllPosts Service");
  const foundPosts = [];

  try {
    const foundClubs = await Club.find();
    for (let club of foundClubs) {
      const posts = await club.populate({
        path: "posts",
        options: { limit: 3, sort: { publishedAt: -1 } },
      });
      foundPosts.push(posts);
    }
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

const getPostById = async (postId) => {
  try {
    const foundPost = await Post.findOne({ postId }).populate(
      "content.comments"
    );
    const foundUser = await foundPost.populate("content.comments.createdBy");

    console.log(foundUser);

    if (!foundPost) {
      return {
        statusCode: 404,
        message: "포스트를 찾을 수 없습니다.",
      };
    }
    return {
      statusCode: 200,
      message: "포스트 조회 성공",
      data: foundPost,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const createPostComment = async (comment) => {
  try {
    const foundPost = await Post.findById(comment._id);
    if (!foundPost) {
      return {
        statusCode: 404,
        message: "포스트를 찾을 수 없습니다.",
      };
    }
    const newComment = new Comment({
      postId: foundPost._id,
      createdBy: comment.userId,
      text: comment.content,
      likes: comment.likes,
    });
    await newComment.save();

    foundPost.content.comments.push(newComment._id);
    await foundPost.save();

    return {
      statusCode: 200,
      message: "댓글 생성 성공",
      data: comment.content,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const likePost = async (postId, userId) => {
  console.log("likePost Service");
  console.log(postId, userId);

  userId = new ObjectId(userId);

  const foundPost = await Post.findOne({ postId });
  if (!foundPost.likes.some((id) => id.equals(userId))) {
    foundPost.likes.push(userId);
  }
  await foundPost.save();

  try {
    return {
      statusCode: 200,
      message: "포스트 좋아요 성공",
      data: {
        postId,
        userId,
      },
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const unlikePost = async (postId, userId) => {
  userId = new ObjectId(userId);

  const foundPost = await Post.findOne({ postId });
  if (foundPost.likes.some((id) => id.equals(userId))) {
    foundPost.likes.pull(userId);
  }

  await foundPost.save();

  try {
    return {
      statusCode: 200,
      message: "포스트 좋아요 취소 성공",
      data: {
        postId,
        userId,
      },
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPostComment,
  likePost,
  unlikePost,
};
