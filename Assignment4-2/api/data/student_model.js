const mongoose = require("mongoose");

const Course = new mongoose.Schema({
    name:String,
    credit_hour:String
});

const Student = new mongoose.Schema({
    name:String,
    grade:Number,
    courses:[Course]
});

mongoose.model("student",Student,"Students");