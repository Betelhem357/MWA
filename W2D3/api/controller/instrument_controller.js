const mongoose = require("mongoose");
const Instrument = mongoose.model("instrument");
const STATUSOK = process.env.STATUSOK;
const STATUSCREATED = process.env.STATUSCREATED;
const STATUSNOCONTENT = process.env.STATUSNOCONTENT;
const INVALIDREQUEST = process.env.INVALIDREQUEST;
const NOTFOUND = process.env.NOTFOUND;
const INTERNALSERVERERROR = process.env.INTERNALSERVERERROR;


module.exports.getAllInstruments = function(req,res){
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

    Instrument.find().skip(offset).limit(count).exec(function(error,instruments){
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = {message:error};
        }else{
            response.status = STATUSOK;
            response.message = instruments
        }
        console.log("getAllInstruments: "+instruments);
          res.status(response.status).json(response.message);
    });
}

module.exports.getInstrumentById = function(req,res){
    const instrumentId = req.params.instrumentId;
    Instrument.findById(instrumentId).exec(function(error,instrumentData){
        const response ={
            status:STATUSOK,
            message:instrumentData
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!instrumentData){
            response.status = NOTFOUND;
            response.message =  "Instrument with Id "+instrumentId+" not found!";
        }
         res.status( response.status).json(response.message);
    });
}

module.exports.createOneInstrument = (req,res)=>{
    const newInstrument = {};
    if(req.body.name){newInstrument.name = req.body.name}
    if(req.body.country){newInstrument.country = req.body.country}
    if(req.body.catagory){newInstrument.catagory = req.body.catagory}
    if(req.body.rank){newInstrument.rank=req.body.rank}
    if(req.body.musics){newInstrument.musics=req.body.musics}

    Instrument.create(newInstrument,function(error,instrument){
        const response = {
           status:STATUSCREATED,
           message:instrument
        };

        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }

        res.status(response.status).json(response.message);
    });
}

module.exports.updatePartialOneInstrument = (req,res)=>{

    const instrumentId = req.params.instrumentId;
    
    Instrument.findById(instrumentId).exec(function(error,instrumentData){
        console.log(instrumentData.name)
        const response ={
            status:STATUSNOCONTENT,
            message:instrumentData
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!instrumentData){
            response.status = NOTFOUND;
            response.message =  "Game with Id "+instrumentId+" not found!";
        }

        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);
        }else{
            if(req.body.name){instrumentData.name =  req.body.name};
             if(req.body.country){instrumentData.country = req.body.country};
             if(req.body.catagory){instrumentData.catagory = req.body.catagory}
             if(req.body.rank){instrumentData.rank=req.body.rank}
             if(req.body.musics){instrumentData.musics=req.body.musics}

             instrumentData.save(function(error,updated_instrument){
                  if(error){
                      response.status = INTERNALSERVERERROR;
                      response.message = error;
                  }else{
                      response.message = updated_instrument;
                  }
             });
        }

         res.status( response.status).json(response.message);
    });
}


module.exports.updateFUllOneInstrument = (req,res)=>{

    const instrumentId = req.params.instrumentId;
    Instrument.findById(instrumentId).exec(function(error,instrumentData){
        const response ={
            status:STATUSNOCONTENT,
            message:instrumentData
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!instrumentData){
            response.status = NOTFOUND;
            response.message =  "Game with Id "+instrumentId+" not found!";
        }

        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);
            return;
        }else{
            instrumentData.name =  req.body.name;
            instrumentData.country = req.body.country;
            instrumentData.catagory = req.body.catagory;
            instrumentData.rank=req.body.rank;
            instrumentData.musics=req.body.musics;

            instrumentData.save(function(error,updated_instrument){
                  if(error){
                      response.status = INTERNALSERVERERROR;
                      response.message = error;
                  }else{
                      response.message = updated_instrument;
                  }
             });
        }

         res.status( response.status).json(response.message);
    });
}

module.exports.deleteInstrument = (req,res)=>{

    const instrumentId = req.params.instrumentId;
    Instrument.findByIdAndDelete(instrumentId).exec(function(error,deletedInstrument){
        const response ={
            status:STATUSNOCONTENT,
            message:deletedInstrument
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!deletedInstrument){
            response.status = NOTFOUND;
            response.message = {"message": "Game with Id "+instrumentId+" not found!"};
        }
         res.status( response.status).json(response.message);
    });
}
