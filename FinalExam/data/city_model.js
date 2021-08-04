const mongoose = require("mongoose");

const Zip = new mongoose.Schema({
    city:String,
    zpi:String,
    pop:Number,
    state:String,
    loc:[Number]
});

mongoose.model("zip",Zip,"zips");