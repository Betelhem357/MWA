const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getPublisherById = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        console.log("publishers");
        res.status(200).json(game);
    });
};