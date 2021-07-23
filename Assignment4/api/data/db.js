require("dotenv").config();
const mongoose = require("mongoose");
require("./games_model.js");

const dbURL = process.env.DATABASEURL+process.env.DATABASENAME;
mongoose.connect(dbURL);

mongoose.connection.on("connected",function(){
    console.log("Mongoose connected to "+ dbURL);
});

mongoose.connection.on("disconnected",function(){
    console.log("Mongoose disconnected to "+ dbURL);
});

mongoose.connection.on("error",function(){
    console.log("Mongoose connected to "+ dbURL);
});

mongoose.connection.on("error",function(){
    console.log("Mongoose connected to "+ dbURL);
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
    });
});