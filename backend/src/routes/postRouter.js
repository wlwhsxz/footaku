const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");

//[ 포스트 전체 요청 ]
router.get("/", verifyToken, postController.getAllPosts);
router.get("/likes", postController.getLikedPosts);

router.get("/:postId", postController.getPostById);

router.post("/:postId/comment", postController.createPostComment);
router.delete("/:postId/comment/:commentId", postController.deletePostComment);

router.post("/:postId/likes", postController.likePost);
router.delete("/:postId/likes", postController.unlikePost);

router.post(
  "/:postId/comments/:commentId/likes",
  postController.likePostComment
);
router.delete(
  "/:postId/comments/:commentId/likes",
  postController.unlikePostComment
);

module.exports = router;
