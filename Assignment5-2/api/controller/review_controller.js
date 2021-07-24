const mongoose = require("mongoose");
const Game = mongoose.model("game");

module.exports.getAllReviews = (req,res)=>{
    const response ={
        status:200,
        message:""
    };

    Game.find().select("reviews").exec(function(error,games){
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

module.exports.getReviewById = (req,res)=>{
   const gameId = req.params.gameId;
   const reviewId = req.params.reviewId;
   Game.findById(gameId).select("reviews").exec(function(error,game){
    const response = {status: 204,message:game}
       if(error){
         response.status = 500;
         response.message = error;
       }else{
        response.message = game.reviews.id(reviewId);
       }
       res.status(response.status).json(response.message);
   });
}

const delete_review = function(req,res,game){
     game.reviews.id(req.body.params.reviewId).remove();
     game.save(function(error,game){
         const response = {status: 204,message:game}
         if(error){
             response.status = 500;
             response.message = error;
         }
         res.status(response.status).json(response.message);
     });
}

const update_review_patch = function(req,res,game){
    
    const review = game.reviews.id(req.params.reviewId);
    if(!review){
        res.status(400).json("review with id not found");
        return;
    }
    if(req.body.name){review.name = req.body.name;}
    if(req.body.data){review.data = req.body.data;}
    if(req.body.review){review.review = req.body.review;}
    
    game.save(function(error,updatedGame){
        const response = {
            status: 204,
            message:updatedGame
        }
        if(error){
            response.status = 500;
            response.message = error;
        }
        res.status(response.status).json(response.message);
    });
}

const update_review_full = function(req,res,game){
    const review = game.reviews.id(req.params.reviewId);
    review.name = req.body.name;
    review.data = req.body.data;
    review.review = req.body.review;
    
    game.save(function(error,updatedGame){
        const response = {
            status: 204,
            message:updatedGame
        }
        if(error){
            response.status = 500;
            response.message = error;
        }
        res.status(response.status).json(response.message);
    });
}

const add_review = function(req,res,game){
    game.reviews.name = req.body.name;
    game.reviews.date = req.body.date;
    game.reviews.review = req.body.review;
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

module.exports.createOneReview = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
        const response = {
            status:200,
            message:game
        };
        if(error){
            response.status = 500;
            response.message = error
        }else if(!game){
            response.status = 404;
            response.message = {"message":"Game with Id: "+gameId+" not found"};
        }

        if(game){
            add_review(req,res,game);
        }else{
            res.status(response.status).json(response.message)
        }
    });
};

module.exports.updatePartialReview = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            update_review_patch(req,res,game);
        }
    })
}

module.exports.updateFullReview = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            update_review_full(req,res,game);
        }
    })
}

module.exports.deleteReview = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            delete_review(req,res,game);
        }
    })
}



