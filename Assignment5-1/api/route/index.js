const express = require("express");
const router = express.Router();
const games_controller = require("../controller/games_controller");
const publisher_controller = require("../controller/publisher_controller");



router.route("/games").get(games_controller.getAllGames)
                      .post(games_controller.createOneGame);
router.route("/games/:gameId").get(games_controller.getOneGame)
                  .patch(games_controller.updatePartialOneGame)
                  .put(games_controller.updateFullOneGame)
                  .delete(games_controller.deleteGame);
router.route("/games/:gameId/publisher").get(publisher_controller.getPublisher)
                  .post(publisher_controller.createOnePublisher);
router.route("/games/:gameId/publisher/:publisherId")
                  .put(publisher_controller.updateFullPublisher)
                  .patch(publisher_controller.updatePartialPublisher)
                  .delete(publisher_controller.deletePublisher);                

module.exports = router;