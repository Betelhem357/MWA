const express = require("express");
const path = require("path");
const app = express();
const router = require("./api/route");

app.use(express.static('public'));
app.use("/api",router);
app.set("port",5353);

const server = app.listen(app.get("port"),function(){
    console.log("Server connected to port: "+this.address().port);
});
 