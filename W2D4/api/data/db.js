require("dotenv").config();
const mongoose = require("mongoose");
require("./job_model");

mongoose.connect(process.env.DBADDRESS+process.env.DBNAME,{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.connection.on("connected",function(){
    console.log("connected");
});
mongoose.connection.on("disconnected",function(){
    console.log("disconnected")
});
mongoose.connection.on("disconnected",function(){
    console.log("disconnected")
});
mongoose.connection.on("error",function(){
    console.log("Error on connection");
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
    });
});

