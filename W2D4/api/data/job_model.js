const mongoose = require("mongoose");

const review = new mongoose.Schema({
     date:Date,
     review:String,
     nameOfReviewer:String
});

const location = new mongoose.Schema({
    address:String,
    coordinates: {
        type: { type: String },
        location: {
            type: { type: String },
            coordinates: []
           }
    }       
});
location.index({ location: "2dsphere" }); 

const job = new mongoose.Schema({
    title:String,
    salary:Number,
    location:location,
    description:String,
    exprience:String,
    skills:[String],
    postDate:Date,
    reviews:[review]
});

mongoose.model("job",job,"jobs");

