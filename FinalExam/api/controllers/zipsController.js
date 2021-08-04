const mongoose = require("mongoose");
const Zip = mongoose.model("zip");

module.exports.getAllZips = (req,res)=>{
    let offset = 0;
    let count = 5;
    let maxValue = 7;
    const response ={
        status:STATUSOK,
        message:""
    };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if(isNaN(offset)||isNaN(count)){
        console.log("Offset or count is not number")
        response.status = INVALIDREQUEST;
        response.message = {message:"Query string offset or count value is not valid"};
        res.status(response.status).json(response.message);
        return;
    }

    if(count>maxValue){
        count = 5;
    }
    Zip.find().exec(function(error,zipData){
        const response = {
            status:200,
            message:zipData.data
        }
        if(error){
            response.status = 500;
            response.message = {message:error} 
        }
        res.status(response.status).json(response.message);
    });
}

