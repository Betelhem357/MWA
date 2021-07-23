const mongoose = require("mongoose");
const game = mongoose.model ("Game");
module.exports.getAllGames = (req, res) => {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count && req.query.count<=7) {
        count = parseInt(req.query.count);
    }

    if(req.query.count>7){
        count = 7;
    }
    game.find().skip(offset).limit(count).exec(function(err,games){
          console.log("found games",games.length);
          res.status(200).json(games);
    });
};

module.exports.getGamesById = function(req,res){
    const gameId = req.params.gameId;
    game.findById(gameId).exec(function(err,gameData){
        res.status(200).send(gameData);
    });
}

