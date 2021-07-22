const express = require("express");
const router = express.Router();
const game_controller = require("../controller/game_controller.js");

 router.route('/games' ).get(game_controller.getAllGames);

 module.exports = router;
