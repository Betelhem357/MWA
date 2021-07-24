const express = require("express");
const app = express();
require("dotenv").config();
require("./api/data/database.js");
const router = require("./api/route");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api",router)


app.listen(process.env.PORT,function(){
    console.log("Connected to: "+this.address().port);
});

