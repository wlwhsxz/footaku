const { Router } = require("express");
const router = Router();

const postController = require("../controllers/postController");

//[ 포스트 전체 요청 ]
router.get("/posts", postController.getAllPosts);

module.exports = router;
