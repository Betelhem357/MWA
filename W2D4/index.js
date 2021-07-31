const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
require("./api/data/db");
app.use(express.json());
const router = require("./api/route/index");
app.use("/api",router);
app.use(express.static("public"));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")))

app.listen(process.env.PORTADRESS,function(){
 console.log("Connected to: ",this.address().port);
});