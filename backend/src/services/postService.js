const { Club, Post, Comment } = require("../db/models/index");
const { AppError } = require("../middlewares/errorHandler");

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
    const foundPost = await Post.findOne({ postId });
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

module.exports = {
  getAllPosts,
  getPostById,
  createPostComment,
};
