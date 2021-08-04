const mongoose = require("mongoose");
require("dotenv").config();
require("./instrument_model");
require("./user_model");

mongoose.connect(process.env.dbURL+process.env.dbInstrument,{ useNewUrlParser: true,useUnifiedTopology:true });

mongoose.connection.on("connected",function(){
    console.log("Connected")
});

mongoose.connection.on("error",function(err){
    console.log("Eror: "+err)
});

