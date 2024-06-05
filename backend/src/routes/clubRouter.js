const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");

const clubController = require("../controllers/clubController");

//[ 클럽 리스트 전체 요청 ]
router.get("/", clubController.getAllClubs);

router.get("/youtubeVideos", clubController.getAllYoutubeVideos);

router.get("/:clubName", clubController.getClubByName);
router.post("/:clubName/follow", verifyToken, clubController.addClubFollower);
router.delete(
  "/:clubName/follow",
  verifyToken,
  clubController.removeClubFollower
);

router.get("/:clubName/youtubeVideos", clubController.getYoutubeVideos);

module.exports = router;
