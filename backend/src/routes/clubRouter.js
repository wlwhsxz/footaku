const { Router } = require("express");
const router = Router();

const clubController = require("../controllers/clubController");

//[ 클럽 리스트 전체 요청 ]
router.get("/", clubController.getAllClubs);

router.get("/youtubeVideos", clubController.getAllYoutubeVideos);

router.get("/:clubName", clubController.getClubByName);

router.get("/:clubName/youtubeVideos", clubController.getYoutubeVideos);

module.exports = router;
