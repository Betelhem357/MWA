const express = require("express");
const router = express.Router();
const game_controller = require("../controller/game_controller.js");
const add_param_controller = require("../controller/add_parameters.js");

router.route("/").get((req , res)=>{

    //console.log("I am Get request :)!");
    res.status(200).sendFile("index.html");
 });

 router.route('/games' ).get(game_controller.getAllGames);

 router.route('/add/:first_num' ).get(add_param_controller.addParameters);

 module.exports = router;
