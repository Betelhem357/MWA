const express = require("express");
require("dotenv").config();
const app = express();
app.set("port",process.env.PORT);
const router = require("./api/route");

app.use(express.static('public'));
app.use("/api",router);


const server = app.listen(app.get("port"),function(){
    console.log("Server connected to port: "+this.address().port);
});
 