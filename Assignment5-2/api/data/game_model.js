const mongoose = require("mongoose");

const review_schema = new mongoose.Schema({
    name:String,
    review:String,
    date:Date
});

const publisher_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:String
});

const game_schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:Number,
    rate:Number,
    price:Number,
    minPlayers:Number,
    maxPlayers:Number,
    minAge:Number,
    designers:String,
    reviews:[review_schema],
    publisher:publisher_schema
});

mongoose.model("game",game_schema,"games");