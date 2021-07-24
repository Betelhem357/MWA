const mongoose = require("mongoose");
const Game = mongoose.model("game");

module.exports.getAllGames = (req,res)=>{
    let offset = 0;
    let count = 5;
    const response ={
        status:200,
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
        response.status = 400;
        response.message = {message:"Query string offset or count value is not valid"};
        res.status(response.status).json(response.message);
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(error,games){
        if(error){
            console.log("Error finding games ",error);
            response.status = 500;
            response.message = {message:error};
        }else{
            response.status = 200;
            response.message = games
        }
          res.status(response.status).json(response.message);
    });
}

module.exports.getOneGame = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(error,gameData){
        const response ={
            status:200,
            message:gameData
        };
        if(error){
            response.status = 500;
            response.message = error;
        }else if(!gameData){
            response.status = 404;
            response.message =  "Game with Id "+gameId+" not found!";
        }
         res.status( response.status).json(response.message);
    });
}

module.exports.createOneGame = (req,res)=>{
    const newGame = {};
    if(req.body.title){
       newGame.title =  req.body.title
    }
    if(req.body.year){newGame.year = parseInt(req.body.year)};
    if(req.body.rate){newGame.rate = parseInt(req.body.rate)};
    if(req.body.price){newGame.price = parseInt(req.body.price)};
    if(req.body.minPlayers){newGame.minPlayers = parseInt(req.body.minPlayers)};
    if(req.body.maxPlayers){newGame.maxPlayers=parseInt(req.body.maxPlayers)};
    if(req.body.publisher){newGame.publisher={}};
    if(req.body.reviews){newGame.reviews=req.body.reviews};
    if(req.body.minAge){newGame.minAge=parseInt(req.body.minAge)};
    if(req.body.designers){newGame.designers=req.body.designers};

    Game.create(newGame,function(error,game){
        const response = {
           status:201,
           message:game
        };

        if(error){
            response.status = 500;
            response.message = error;
        }

        res.status(response.status).json(response.message);
    });
}

module.exports.updatePartialOneGame = (req,res)=>{

    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(error,gameData){
        const response ={
            status:204,
            message:gameData
        };
        if(error){
            response.status = 500;
            response.message = error;
        }else if(!gameData){
            response.status = 404;
            response.message =  "Game with Id "+gameId+" not found!";
        }

        if(response.status!==204){
            res.status(response.status).json(response.message);
        }else{
            if(req.body.title){
                gameData.title =  req.body.title
             }
             if(req.body.year){gameData.year = parseInt(req.body.year)};
             if(req.body.rate){gameData.rate = parseInt(req.body.rate)};
             if(req.body.price){gameData.price = parseInt(req.body.price)};
             if(req.body.minPlayers){gameData.minPlayers = parseInt(req.body.minPlayers)};
             if(req.body.maxPlayers){gameData.maxPlayers=parseInt(req.body.maxPlayers)};
             if(req.body.publisher){gameData.publisher={}};
             if(req.body.reviews){gameData.reviews=req.body.reviews};
             if(req.body.minAge){gameData.minAge=parseInt(req.body.minAge)};
             if(req.body.designers){gameData.designers=req.body.designers};

             gameData.save(function(error,updatedGame){
                  if(error){
                      response.status = 500;
                      response.message = error;
                  }else{
                      response.message = updatedGame;
                  }
             });
        }

         res.status( response.status).json(response.message);
    });
}

module.exports.deleteGame = (req,res)=>{

    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function(error,deletedGame){
        const response ={
            status:204,
            message:deletedGame
        };
        if(error){
            response.status = 500;
            response.message = error;
        }else if(!deletedGame){
            response.status = 404;
            response.message = {"message": "Game with Id "+gameId+" not found!"};
        }
         res.status( response.status).json(response.message);
    });
}