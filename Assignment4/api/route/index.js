const express = require("express");
const router = express.Router();
const game_controller = require("../controller/game_controller.js");
const publisher_controller = require("../controller/publisher_controller.js");

 router.route('/games' ).get(game_controller.getAllGames);
 router.route('/games/:gameId' ).get(game_controller.getGamesById);


 module.exports = router;
