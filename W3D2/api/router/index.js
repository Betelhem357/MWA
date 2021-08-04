const express = require("express");
const router = express.Router();
const games_controller = require("../controller/games_controller");
const publisher_controller = require("../controller/publisher_controller");
const user_controller = require("../controller/user_controller");



router.route("/games")
                  .get(games_controller.getAllGames)
                  .post(games_controller.createOneGame);
router.route("/games/:gameId")
                  .get(games_controller.getOneGame)
                  .patch(games_controller.updatePartialOneGame)
                  .put(games_controller.updateFullOneGame)
                  .delete(games_controller.deleteGame);
router.route("/games/:gameId/publisher")
                  .get(publisher_controller.getPublisher)
                  .post(publisher_controller.createOnePublisher)//put and post do the same thing
                  .put(publisher_controller.updateFullPublisher)
                  .patch(publisher_controller.updatePartialPublisher)
                  .delete(publisher_controller.deletePublisher); 
router.route("/users").post(user_controller.register);
router.route("/login").post(user_controller.login);
                                 

module.exports = router;