const mongoose = require("mongoose");

const Singer = new mongoose.Schema({
    name:String,
    country:String,
    totalPrize:Number
});

const Music = new mongoose.Schema({
    name:String,
    year:Number,
    singer:Singer
});

const Instrument = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    catagory: {
        type: String,
        enum : ['Membranophones','Chordophones','Aerophones'],
        default: 'Aerophones'
    },
    country:String,
    musics:[Music]
});

mongoose.model("instrument",Instrument,"instruments");