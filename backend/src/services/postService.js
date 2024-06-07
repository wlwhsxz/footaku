const { Club, Post, Comment, User } = require("../db/models/index");
const { AppError } = require("../middlewares/errorHandler");
const ObjectId = require("mongoose").Types.ObjectId;

//[ 포스트 전체 요청 ]
const getAllPosts = async (userId) => {
  try {
    const foundClubs = await Club.find();
    const foundUser = await User.findOne({ userId });
    if (!foundUser) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    const userFollowedClubs = foundUser.followings;
    const userClubs = foundClubs.filter((club) =>
      userFollowedClubs.includes(club.name)
    );

    const postPromises = userClubs.map((club) =>
      club.populate({
        path: "posts",
        options: { limit: 3, sort: { publishedAt: -1 } },
        populate: {
          path: "content.comments",
          model: "Comment",
        },
      })
    );

    const foundPosts = await Promise.all(postPromises);

    return {
      statusCode: 200,
      message: "포스트 전체 요청 성공",
      data: foundPosts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new AppError(500, "Internal Server Error");
  }
};

const getLikedPosts = async (userId) => {
  userId = new ObjectId(userId);

  try {
    const likedPosts = await Post.find({ "likes._id": userId });

    return {
      statusCode: 200,
      message: "포스트 전체 요청 성공",
      data: likedPosts,
    };
  } catch (error) {
    return new AppError(500, "Internal Server Error");
  }
};

const getPostById = async (postId) => {
  try {
    const foundPost = await Post.findOne({ postId }).populate(
      "content.comments"
    );
    const foundUser = await foundPost.populate("content.comments.createdBy");

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

    const commentList = foundPost.content.comments;
    commentList.push(newComment._id);
    await foundPost.save();
    const newCommentId = commentList[commentList.length - 1];
    const savedNewComment = await Comment.findById(newCommentId).populate(
      "createdBy"
    );

    return {
      statusCode: 200,
      message: "댓글 생성 성공",
      data: savedNewComment,
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const deletePostComment = async (postId, commentId) => {
  commentId = new ObjectId(commentId);

  try {
    const foundPost = await Post.findOne({ postId });
    if (!foundPost) {
      return {
        statusCode: 404,
        message: "포스트를 찾을 수 없습니다.",
      };
    }

    const commentList = foundPost.content.comments;
    const index = commentList.indexOf(commentId);
    if (index === -1) {
      return {
        statusCode: 404,
        message: "댓글을 찾을 수 없습니다.",
      };
    }

    commentList.splice(index, 1);
    await foundPost.save();

    await Comment.findByIdAndDelete(commentId);
    console.log("댓글 삭제 성공");

    return {
      statusCode: 200,
      message: "댓글 삭제 성공",
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const likePost = async (postId, userId) => {
  try {
    userId = new ObjectId(userId);

    const foundPost = await Post.findOne({ postId });
    if (!foundPost.likes.some((id) => id.equals(userId))) {
      foundPost.likes.push(userId);
    }
    await foundPost.save();
    const likeData = foundPost.likes;

    return {
      statusCode: 200,
      message: "포스트 좋아요 성공",
      data: {
        likeData,
      },
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const unlikePost = async (postId, userId) => {
  userId = new ObjectId(userId);

  try {
    const foundPost = await Post.findOne({ postId });
    if (foundPost.likes.some((id) => id.equals(userId))) {
      foundPost.likes.pull(userId);
    }
    await foundPost.save();
    const likeData = foundPost.likes;

    return {
      statusCode: 200,
      message: "포스트 좋아요 취소 성공",
      data: {
        likeData,
      },
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

const likePostComment = async (commentId, userId) => {
  try {
    userId = new ObjectId(userId);

    const foundComment = await Comment.findById(commentId);

    if (foundComment && !foundComment.likes.some((id) => id.equals(userId))) {
      foundComment.likes.push(userId);
    }

    await foundComment.save();
    const likeData = foundComment.likes;

    return {
      statusCode: 200,
      message: "댓글 좋아요 성공",
      data: { likeData },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "댓글 좋아요 실패",
    };
  }
};

const unlikePostComment = async (commentId, userId) => {
  try {
    userId = new ObjectId(userId);

    const foundComment = await Comment.findById(commentId);
    if (foundComment.likes.some((id) => id.equals(userId))) {
      foundComment.likes.pull(userId);
    }
    await foundComment.save();
    const likeData = foundComment.likes;

    return {
      statusCode: 200,
      message: "댓글 좋아요 취소 성공",
      data: { likeData },
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllPosts,
  getLikedPosts,
  getPostById,
  createPostComment,
  deletePostComment,
  likePost,
  unlikePost,
  likePostComment,
  unlikePostComment,
};
