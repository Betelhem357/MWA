const express = require("express");
const app = express();
const path = require("path")
app.use(express.urlencoded({extended:false}))
app.use(express.json());
require("./api/data/db")
const router = require("./api/router");
require("dotenv").config();
app.use("/api",router);
app.use(express.static("public"));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")))

app.listen(process.env.PORT,function(){
 console.log("connected to: ",this.address().port);
});