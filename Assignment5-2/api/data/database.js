require("dotenv").config();
const mongoose = require("mongoose");
require("./game_model.js")


mongoose.connect(process.env.dbURL+process.env.dbName,{ useUnifiedTopology: true,useNewUrlParser: true  });

mongoose.connection.on("connected",function(){
   console.log("Connected");
});

mongoose.connection.on("disconnected",function(){
    console.log("Disconnected");
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
