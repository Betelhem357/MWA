const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});



const gameSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price: Number,
    designers: [String],
    players: Number,
    rate: Number,
    publisher:publisherSchema
});

mongoose.model("Game",gameSchema,"games");