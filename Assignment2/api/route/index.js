const express = require("express");
const router = express.Router();
const game_controller = require("../controller/game_controller.js");

router.route("/").get((req , res)=>{

    console.log("I am Get request :)!");
    res.status(200).sendFile("index.html");
 });

 //router.route('/add/:first_num' ).get(game_controller.getAllGames);
 router.route('/games' ).get(game_controller.getAllGames);

 module.exports = router;
