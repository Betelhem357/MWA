const express = require("express");
require("./api/data/database.js");
const router = require("./api/route");
const path = require('path');
const app = express();
require("dotenv").config();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use(express.static(process.env.PUBLIC_FOLDER))


app.use("/api",router);

app.listen(process.env.PORTADDRESS,function(){
    console.log("Connected to: "+this.address().port);
});