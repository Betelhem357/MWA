const mongoose = require("mongoose");
const Game = mongoose.model("game");
const STATUSOK = process.env.STATUSOK;
const STATUSCREATED = process.env.STATUSCREATED;
const STATUSNOCONTENT = process.env.STATUSNOCONTENT;
const INVALIDREQUEST = process.env.INVALIDREQUEST;
const NOTFOUND = process.env.NOTFOUND;
const INTERNALSERVERERROR = process.env.INTERNALSERVERERROR;

module.exports.getAllReviews = (req,res)=>{
    const response ={
        status:STATUSOK,
        message:""
    };
    
    const gameId = req.params.gameId;

    Game.findById(gameId).select("reviews").exec(function(error,games){
        if(error){
            console.log("Error finding games ",error);
            response.status = INTERNALSERVERERROR;
            response.message = {message:error};
        }else{
            response.status = STATUSOK;
            response.message = games.reviews
        }
          res.status(response.status).json(response.message);
    });
}

module.exports.getReviewById = (req,res)=>{
   const gameId = req.params.gameId;
   const reviewId = req.params.reviewId;
   Game.findById(gameId).select("reviews").exec(function(error,game){
    const response = {status: STATUSOK,message:game}
       if(error){
         response.status = INTERNALSERVERERROR;
         response.message = error;
       }else{
        if(!game.reviews.id(reviewId)){
            res.status(NOTFOUND).json("Review with Id: "+reviewId+" not found!");
            return;
        }
        response.message = game.reviews.id(reviewId);
       }
       res.status(response.status).json(response.message);
   });
}

const delete_review = function(req,res,game){
    const reviewId = req.body.params.reviewId;
    if(!game.reviews.id(reviewId)){
        res.status(NOTFOUND).json("Review with Id: "+reviewId+" not found!");
        return;
     }
     game.reviews.id(reviewId).remove();
     game.save(function(error,game){
         const response = {status: STATUSNOCONTENT,message:game}
         if(error){
             response.status = INTERNALSERVERERROR;
             response.message = error;
         }
         res.status(response.status).json(response.message);
     });
}

const update_review_patch = function(req,res,game){
    const reviewId = req.params.reviewId;
    const review = game.reviews.id(reviewId);
    if(!review){
        res.status(NOTFOUND).json("review with id not found");
        return;
    }
    if(req.body.name){review.name = req.body.name;}
    if(req.body.date){review.date = req.body.date;}
    if(req.body.review){review.review = req.body.review;}
    
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

const update_review_full = function(req,res,game){
    const reviewId = req.params.reviewId;
    const review = game.reviews.id(reviewId);
    if(!review){
        res.status(INVALIDREQUEST).json("Review with Id: "+reviewId+" not found!");
        return;
    }
    review.name = req.body.name;
    review.date = req.body.date;
    review.review = req.body.review;
    
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

const add_review = function(req,res,game){
    const review = {
        name : req.body.name,
        date : req.body.date,
        review : req.body.review
    }

    if(!game.reviews){
        game.reviews = [];
    }
    

    game.reviews.push(review);
    console.log(game.reviews);
    
     game.save(function(error,updatedGame){
        const response = {
            status:STATUSOK,
            message:updatedGame
        }
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
            console.log(error)
        }else{
            response.status = STATUSCREATED;
            response.message = updatedGame.reviews;
        }
        res.status(response.status).json(response.message);
     });
}

module.exports.createOneReview = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            add_review(req,res,game);
        }else{
            res.status(response.status).json(response.message)
        }
    });
};

module.exports.updatePartialReview = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            update_review_patch(req,res,game);
        }
    })
}

module.exports.updateFullReview = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            update_review_full(req,res,game);
        }
    })
}

module.exports.deleteReview = (req,res)=>{
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(error,game){
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
            delete_review(req,res,game);
        }
    })
}



