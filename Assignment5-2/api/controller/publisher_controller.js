const mongoose = require("mongoose");
const Game = mongoose.model("game");
const STATUSOK = process.env.STATUSOK;
const STATUSCREATED = process.env.STATUSCREATED;
const STATUSNOCONTENT = process.env.STATUSNOCONTENT;
const INVALIDREQUEST = process.env.INVALIDREQUEST;
const NOTFOUND = process.env.NOTFOUND;
const INTERNALSERVERERROR = process.env.INTERNALSERVERERROR;

module.exports.getPublisher = (req,res)=>{
   const gameId = req.params.gameId;
   Game.findById(gameId).select("publisher").exec(function(error,game){
    if(error){
        console.log("Error finding music ",error);
        response.status = INTERNALSERVERERROR;
        response.message = {message:error};
    }else{ 
        response.status = STATUSOK;
        response.message = game.publisher;
    }
        res.status(STATUSOK).json(response.message);
   });
}

const delete_publisher = function(req,res,game){
     game.publisher.remove();
     game.save(function(error,game){
         const response = {status: STATUSNOCONTENT,message:game}
         if(error){
             response.status = INTERNALSERVERERROR;
             response.message = error;
         }
         res.status(response.status).json(response.message);
     });
}

const update_publisher_partial = function(req,res,game){
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.save(function(error,updatedGame){
        const response = {
            status: STATUSNOCONTENT,
            message:updatedGame
        }
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }
        res.status(response.status).json(response.message);
    });
}

const update_publisher_full = function(req,res,game){
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.save(function(error,updatedGame){
        const response = {
            status: STATUSNOCONTENT,
            message:updatedGame
        }
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }
        res.status(response.status).json(response.message);
    });
}

const add_publisher = function(req,res,game){
     game.publisher.name = req.body.name;
     game.publisher.country = req.body.country;
     game.save(function(error,updatedGame){
        const response = {
            status:200,
            message:updatedGame
        }
        if(error){
            response.status = 500;
            response.message = error;
        }else{
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
     });
}

module.exports.createOnePublisher = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(error,game){
        console.log("publisher");
        const response = {
            status:STATUSNOCONTENT,
            message:game
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error
        }else if(!game){
            response.status = NOTFOUND;
            response.message = {"message":"Game with Id: "+gameId+" not found"};
        }

        if(response.status===STATUSNOCONTENT){
            add_publisher(req,res,game);
        }else{
            res.status(response.status).json(response.message)
        }
    });
};

module.exports.updatePartialPublisher = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(error,game){
        const response = {status:STATUSNOCONTENT,message:game}
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!game){
            response.status = NOTFOUND;
            response.message = "No publisher found by id: " + gameId;  
        }
        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);

        }else{
            update_publisher_partial(req,res,game);
        }
    })
}

module.exports.updateFullPublisher = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(error,game){
        const response = {status:STATUSNOCONTENT,message:game}
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!game){
            response.status = NOTFOUND;
            response.message = {"message":"Game with ID not found"}  
        }
        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);

        }else{
            update_publisher_full(req,res,game);
        }
    })
}


module.exports.deletePublisher = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(error,game){
        const response = {status:204,message:game}
        if(error){
            response.status = 500;
            response.message = error;
        }else if(!game){
            response.status = 404;
            response.message = {"message":"Game with ID not found"}  
        }
        if(response.status!==204){
            res.status(response.status).json(response.message);

        }else{
            delete_publisher(req,res,game);
        }
    })
}



