const mongoose = require("mongoose");

mongoose.connect(process.env.dbURL+process.env.dbName,{ useUnifiedTopology: true,useNewUrlParser: true  });
mongoose.connection.on("connected",function(){

})
mongoose.connection.on("disconnected",function(){
    
})
mongoose.connection.on("connected",function(){
    
})

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
    });
});