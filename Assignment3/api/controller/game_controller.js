const dbconnection= require("../data/dbconection.js");
module.exports.getAllGames = (req, res) => {
    const collection= dbconnection.get().collection("games");
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

    collection.find().skip(offset).limit(count).toArray(function(err, data) {
        console.log("It display 7 elements by default if user doesn't specify anything");
        res.status(200).json(data);
    });

};