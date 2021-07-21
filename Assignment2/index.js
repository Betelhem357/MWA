const express = require("express");
const path = require("path");
const app = express();
const router = require("./api/route");

//app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use("/api",router);
app.set("port",5353);
// app.use("/css",function(req,res,next){
//     console.log(req.method,req.url);
//     next();
// });

const server = app.listen(app.get("port"),function(){
    console.log("Server connected to port: "+this.address().port);
});


// app.get('/' , (req , res)=>{

//    console.log("I am Get request :)!");
//    res.status(200).sendFile("index.html");
// });

// app.get('/json' , (req , res)=>{

//     console.log("I am Get request :)!");
//     res.status(200).json({"data":"hello"});
//  });

//  app.get('/file' , (req , res)=>{

//     console.log("I am Get request :)!");
//     res.status(200).sendFile(path.join(__dirname,"index.js"));
//  });

 