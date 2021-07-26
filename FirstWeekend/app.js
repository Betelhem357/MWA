const express = require("express");
require("./api/data/database.js");
const router = require("./api/route");
const app = express();
require("dotenv").config();
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/api",router);

app.listen(process.env.PORTADDRESS,function(){
    console.log("Connected to: "+this.address().port);
});