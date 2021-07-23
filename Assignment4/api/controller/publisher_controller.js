const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const runGeoQuery = function(req,req){
   const lat = parseFloat(req.query.lat);
   const lng = parseFloat(req.query.lng);// don't use integers
   console.log("Geo search ",lat,lng);

   const query = {
       "publisher.location":{
           $near:{
               $geometry:{
                    type:"Point",
                    coordinate:[lng,lat]
               },
               $maxDistance:1000,
               $minDistance:0
           }
       }
   }

   Game.find(query).exec(function(err,games){
       console.log("Found games: ",games);
       res.status(200).json(games);
   });
}

module.exports.getPublisherById = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        console.log("publishers");
        res.status(200).json(game);
    });
};