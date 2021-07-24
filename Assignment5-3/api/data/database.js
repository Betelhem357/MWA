const mongoose = require("mongoose");
require("dotenv").config();
require("./student_model.js");

mongoose.connect(process.env.dbURL+process.env.dbStudent);

mongoose.connection.on("connected",function(){
    console.log("Connected")
});

mongoose.connection.on("error",function(err){
    console.log("Eror: "+err)
});

