const express = require("express");
const router = express.Router();
const games_controller = require("../controller/games_controller");



router.route("/games").get(games_controller.getAllGames)
                      .post(games_controller.createOneGame);
router.route("/games/:gameId").get(games_controller.getOneGame)
                  .patch(games_controller.updatePartialOneGame)
                  .put(games_controller.updateFullOneGame)
                  .delete(games_controller.deleteGame);           

module.exports = router;