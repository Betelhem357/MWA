const mongoose = require("mongoose");
const Job = mongoose.model("job");

function add_review(req,res,jobData){
    const response ={
        status:201,
        message:jobData
    };
    const newReview = {};
    newReview.date = req.body.date;
    newReview.review = req.body.review;
    newReview.nameOfReviewer = req.body.nameOfReviewer;
    if(!jobData.reviews){
        jobData.reviews = [];
    }
    jobData.reviews.push(newReview);
    jobData.save(function(error,updatedJob){
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else{
            response.status = 201;
            response.message = updatedJob;
        }
    })
    res.status(response.status).json(response.message);
}

module.exports.addReview = function(req,res){

    const jobId = req.params.jobId;
    Job.findById(jobId).select("reviews").exec(function(error,jobData){
        const response ={
            status:201,
            message:jobData
        };
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else if(!jobData){
            response.status = 404;
            response.message = "Job with that id not found";
        }
        if(response.status===201){
            add_review(req,res,jobData);
        }
        else{
            res.status(response.status).json(response.message);
        }
        
    })

}

function partial_update_review(req,res,jobData){
    const response ={
        status:204,
        message:jobData
    };
    const reviewId = req.params.reviewId;
    const currentReview = jobData.reviews.id(reviewId);
    if(!currentReview){
       response.status = 404;
       response.message = "Review with id not found";
    }else{
        if(req.body.date){currentReview.date = req.body.date;}
        if(req.body.review){currentReview.review = req.body.review;}
        if(req.body.nameOfReviewer){currentReview.nameOfReviewer = req.body.nameOfReviewer;}
        jobData.save(function(error,updatedJob){
             if(error){
                 response.status = 500;
                 response.message = {message:error};
             }else{
                 response.message = updatedJob;
             }
             res.status(response.status).json(response.message);
        })
    }
}

module.exports.partialUpdateReview = function(req,res){
    const jobId = req.params.jobId;
    Job.findById(jobId).select("reviews").exec(function(error,jobData){
        const response ={
            status:204,
            message:jobData
        };
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else if(!jobData){
            response.status = 404;
            response.message = "Job with that id not found";
        }
        if(response.status===204){
            partial_update_review(req,res,jobData);
        }
        else{
            res.status(response.status).json(response.message);
        }
        
    })
}
function full_update_review(req,res,jobData){
    const response ={
        status:204,
        message:jobData
    };
    const reviewId = req.params.reviewId;
    const currentReview = jobData.reviews.id(reviewId);
    if(!currentReview){
       response.status = 404;
       response.message = "Review with id not found";
    }else{
        currentReview.date = req.body.date;
        currentReview.review = req.body.review;
        currentReview.nameOfReviewer = req.body.nameOfReviewer;
        jobData.save(function(error,updatedJob){
             if(error){
                 response.status = 500;
                 response.message = {message:error};
             }else{
                 response.message = updatedJob;
             }
             res.status(response.status).json(response.message);
        })
    } 
}
module.exports.fullUpdateReview = function(req,res){
    const jobId = req.params.jobId;
    Job.findById(jobId).select("reviews").exec(function(error,jobData){
        const response ={
            status:204,
            message:jobData
        };
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else if(!jobData){
            response.status = 404;
            response.message = "Job with that id not found";
        }
        if(response.status===204){
            full_update_review(req,res,jobData);
        }
        else{
            res.status(response.status).json(response.message);
        }
        
    })
}
function remove_review(req,res,jobData){
    const response ={
        status:204,
        message:jobData
    };
    const reviewId = req.params.reviewId;
    const currentReview = jobData.reviews.id(reviewId);
    if(!currentReview){
       response.status = 404;
       response.message = "Review with id not found";
    }else{
        currentReview.remove();
        jobData.save(function(error,updatedJob){
             if(error){
                 response.status = 500;
                 response.message = {message:error};
             }else{
                 response.message = updatedJob;
             }
             res.status(response.status).json(response.message);
        })
    } 
}
module.exports.removeReview = function(req,res){
    const jobId = req.params.jobId;
    Job.findById(jobId).select("reviews").exec(function(error,jobData){
        const response ={
            status:204,
            message:jobData
        };
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else if(!jobData){
            response.status = 404;
            response.message = "Job with that id not found";
        }
        if(response.status===204){
            remove_review(req,res,jobData);
        }
        else{
            res.status(response.status).json(response.message);
        }
        
    })
}
module.exports.getAllReview = function(req,res){
    const jobId = req.params.jobId;
    Job.findById(jobId).select("reviews").exec(function(error,jobData){
        const response ={
            status:200,
            message:jobData
        };
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else if(!jobData){
            response.status = 404;
            response.message = "Job with that id not found";
        }else{
            response.message = jobData.reviews;
        }
            res.status(response.status).json(response.message);
        
    })
}
module.exports.getReviewById = function(req,res){
    const jobId = req.params.jobId;
    const reviewId = req.params.reviewId;
    Job.findById(jobId).select("reviews").exec(function(error,jobData){
        const response ={
            status:201,
            message:jobData
        };
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else if(!jobData){
            response.status = 404;
            response.message = "Job with that id not found";
        }else{
            if(!jobData.reviews.id(reviewId)){
                res.status(404).json("Music with Id: "+reviewId+" not found!");
                return;
            }
            response.message = jobData.reviews.id(reviewId);
        }
            res.status(response.status).json(response.message);
        
    })
}