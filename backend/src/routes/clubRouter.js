const { Router } = require("express");
const router = Router();

const clubController = require("../controllers/clubController");

//[ 클럽 리스트 전체 요청 ]
router.get("/", clubController.getAllClubs);

router.get("/:clubName", clubController.getClubByName);

module.exports = router;
