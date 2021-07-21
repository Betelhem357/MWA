const games_json_data = require("../../resources/games.json");
module.exports.getAllGames = (req, res) => {
    // It is not recommended to display all json file so i use display 10 elements by default
    let offset = 0;
    let count = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    let data = games_json_data.slice(offset, offset + count);
    console.log("It is not recommended to display all json file so i use to display 10 elements by default");
    res.status(200).json(data);
    //To send all data we can use
    //res.status(200).json(games_json_data);
};