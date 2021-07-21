const games_json_data = require("../../resources/games.json");
module.exports.getAllGames = (req , res)=>{
    
    res.status(200).json(games_json_data);
 };