const mongoose = require("mongoose");

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
    reviews:String,
    publisher:publisher_schema
});

mongoose.model("game",game_schema,"games");