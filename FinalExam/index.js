require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.listen(process.env.PORT,function(){
    console.log("Port",this.address().port);
});