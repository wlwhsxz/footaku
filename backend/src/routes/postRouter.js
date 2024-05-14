const { Router } = require("express");
const router = Router();

const postController = require("../controllers/postController");

//[ 포스트 전체 요청 ]
router.get("/", postController.getAllPosts);

router.get("/:postId", postController.getPostById);

router.post("/:postId/comment", postController.createPostComment);

router.post("/:postId/likes", postController.likePost);
router.delete("/:postId/likes", postController.unlikePost);

module.exports = router;
