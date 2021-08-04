const mongoose = require("mongoose");

const Music = new mongoose.Schema({
    name:String,
    year:Number
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
    rank:Number,
    country:String,
    musics:[Music]
});

mongoose.model("instrument",Instrument,"instruments");