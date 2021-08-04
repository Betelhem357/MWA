const mongoose = require("mongoose");
const Game = mongoose.model("game");
const STATUSOK = process.env.STATUSOK;
const STATUSCREATED = process.env.STATUSCREATED;
const STATUSNOCONTENT = process.env.STATUSNOCONTENT;
const INVALIDREQUEST = process.env.INVALIDREQUEST;
const NOTFOUND = process.env.NOTFOUND;
const INTERNALSERVERERROR = process.env.INTERNALSERVERERROR;

module.exports.getAllGames = (req,res)=>{
    let offset = 0;
    let count = 5;
    let maxValue = 7;
    const response ={
        status:STATUSOK,
        message:""
    };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if(isNaN(offset)||isNaN(count)){
        console.log("Offset or count is not number")
        response.status = INVALIDREQUEST;
        response.message = {message:"Query string offset or count value is not valid"};
        res.status(response.status).json(response.message);
        return;
    }

    if(count>maxValue){
        count = 5;
    }

    Game.find().skip(offset).limit(count).exec().then((result)=>returnAllGames(result)).catch((err)=>failure(err));
}

const returnAllGames = function(games){
      res.status(STATUSOK).json(games);
}

module.exports.getOneGame = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(req.params.gameId).exec().then((result)=>returnGame(result,res)).catch((err)=>failure(err));
}

const returnGame = function(gameData,res){
    if(!gameData){
        res.status( NOTFOUND).json({message:"Game with this Id not found!"});
    }else{
        res.status( STATUSOK).json(gameData);
    }
}

const failure = function(err){
    res.status( INTERNALSERVERERROR).json(err);
}

const sendCreatingStatus = function(game){
    res.status(STATUSCREATED).json(game);
}

module.exports.createOneGame = (req,res)=>{
    const newGame = {};
    if(req.body.title){newGame.title =  req.body.title}
    if(req.body.year){newGame.year = parseInt(req.body.year)};
    if(req.body.rate){newGame.rate = parseInt(req.body.rate)};
    if(req.body.price){newGame.price = parseInt(req.body.price)};
    if(req.body.minPlayers){newGame.minPlayers = parseInt(req.body.minPlayers)};
    if(req.body.maxPlayers){newGame.maxPlayers=parseInt(req.body.maxPlayers)};
    if(req.body.publisher){newGame.publisher=req.body.publisher};
    if(req.body.reviews){newGame.reviews=req.body.reviews};
    if(req.body.minAge){newGame.minAge=parseInt(req.body.minAge)};
    if(req.body.designers){newGame.designers=req.body.designers};

    Game.create(newGame).then((response)=>sendCreatingStatus(response)).catch((err)=>failure(err))
}

module.exports.updatePartialOneGame = (req,res)=>{

    const gameId = req.params.gameId;
    Game.findById(gameId).exec().then((response)=>updateGame(req,response)).then((response) => res.status(204).json(response))
    .catch((err) => res.satus(500).json(err));
}

const updateGame = function(req,gameData){
    if(req.body.title){gameData.title =  req.body.title}
             if(req.body.year){gameData.year = parseInt(req.body.year)};
             if(req.body.rate){gameData.rate = parseInt(req.body.rate)};
             if(req.body.price){gameData.price = parseInt(req.body.price)};
             if(req.body.minPlayers){gameData.minPlayers = parseInt(req.body.minPlayers)};
             if(req.body.maxPlayers){gameData.maxPlayers=parseInt(req.body.maxPlayers)};
             if(req.body.publisher){gameData.publisher=req.body.publisher};
             if(req.body.reviews){gameData.reviews=req.body.reviews};
             if(req.body.minAge){gameData.minAge=parseInt(req.body.minAge)};
             if(req.body.designers){gameData.designers=req.body.designers};
             return gameData.save();
}

module.exports.updateFullOneGame = (req,res)=>{

    const gameId = req.params.gameId;
    Game.findById(gameId).exec().then((game)=>fullUpdateGame(game, req, res))
    .then((game) => res.status(204).json(game))
    .catch((err) => res.status(500).json(err));;

    function fullUpdateGame(doc, req, res) {

        gameData.title =  req.body.title
        gameData.year = parseInt(req.body.year);
        gameData.rate = parseInt(req.body.rate);
        gameData.price = parseInt(req.body.price);
        gameData.minPlayers = parseInt(req.body.minPlayers);
        gameData.maxPlayers=parseInt(req.body.maxPlayers);
        gameData.publisher={};
        gameData.reviews=req.body.reviews;
        gameData.minAge=parseInt(req.body.minAge);
        gameData.designers=req.body.designers;

        return gameData.save();
    };
}

module.exports.deleteGame = (req,res)=>{

    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).then((response) => deleteResponse(response, res))
    .catch((err) => failure(err));
}

const deleteResponse = function(game,res){
    if(!game){
        res.status(NOTFOUND).json({ message: "game not found" });
}else{
    res.status(204).json(game);
}
    
}