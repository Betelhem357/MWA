const { response } = require("express");
const mongoose = require("mongoose");
const Instrument = mongoose.model("instrument");
const STATUSOK = process.env.STATUSOK;
const STATUSCREATED = process.env.STATUSCREATED;
const STATUSNOCONTENT = process.env.STATUSNOCONTENT;
const INVALIDREQUEST = process.env.INVALIDREQUEST;
const NOTFOUND = process.env.NOTFOUND;
const INTERNALSERVERERROR = process.env.INTERNALSERVERERROR;

module.exports.getAllMusics = (req,res)=>{
    const response ={
        status:STATUSOK,
        message:""
    };
    
    const instrumentId = req.params.instrumentId;

    Instrument.findById(instrumentId).select("musics").exec(function(error,musics){
        if(error){
            console.log("Error finding music ",error);
            response.status = INTERNALSERVERERROR;
            response.message = {message:error};
        }else{
            response.status = STATUSOK;
            response.message = musics.musics;
        }
            res.status(response.status).json(response.message);
    });
}

module.exports.getMusicById = (req,res)=>{
   console.log("getting music by id");
   const instrumentId = req.params.instrumentId;
   const musicId = req.params.musicId;
   Instrument.findById(instrumentId).select("musics").exec(function(error,instrument){
    const response = {status: STATUSOK,message:instrument}
       if(error){
         response.status = INTERNALSERVERERROR;
         response.message = error;
       }else{
        if(!instrument.musics.id(musicId)){
            res.status(NOTFOUND).json("Music with Id: "+musicId+" not found!");
            return;
        }
        response.message = instrument.musics.id(musicId);
        console.log(response.message);
       }
       res.status(response.status).json(response.message);
   });
}

const delete_music = function(req,res,instrument){
    const musicId = req.params.musicId;
     if(!instrument.musics.id(req.params.musicId)){
        res.status(NOTFOUND).json("Music with Id: "+musicId+" not found!");
        return;
     }
     instrument.musics.id(musicId).remove();
     instrument.save(function(error,instrument){
         const response = {status: STATUSNOCONTENT,message:instrument}
         if(error){
             response.status = INTERNALSERVERERROR;
             response.message = error;
         }
         res.status(response.status).json(response.message);
     });
}

const update_music_patch = function(req,res,instrument){
    const musicId = req.params.musicId;
    const musicData = instrument.musics.id(musicId);
   
    if(!musicData){
        res.status(NOTFOUND).json("music with id "+musicId +"not found");
        return;
    }
    if(req.body.name){musicData.name = req.body.name;}
    if(req.body.year){musicData.year = req.body.year;}

    instrument.save(function(error,updatedInstrument){
        const response = {
            status: STATUSNOCONTENT,
            message:instrument
        }
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }
        res.status(response.status).json(response.message);
    });
}

const update_music_full = function(req,res,instrument){
    const music = instrument.musics.id(req.params.musicId);
    if(!music){
        res.status(INVALIDREQUEST).json("Music with Id: "+req.params.musicId+" not found!");
        return;
    }
    music.name = req.body.name;
    music.year = req.body.year;
    
    instrument.save(function(error,updatedInstrument){
        const response = {
            status: STATUSNOCONTENT,
            message:updatedInstrument
        }
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }
        res.status(response.status).json(response.message);
    });
}

const add_music = function(req,res,instrument){
    const music = {
        name:req.body.name,
        year:req.body.year
    }

    if(!instrument.musics){
        instrument.musics = [];
    }

    instrument.musics.push(music);

     instrument.save(function(error,updatedInstrument){
        const response = {
            status:STATUSOK,
            message:updatedInstrument
        }
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else{
            response.status = STATUSCREATED;
            response.message = updatedInstrument.publisher;
        }
        res.status(response.status).json(response.message);
     });
}

module.exports.createOneMusic = function (req, res) {
    const instrumentId = req.params.instrumentId;
    Instrument.findById(instrumentId).select("musics").exec(function(error,instrument){
        const response = {
            status:STATUSNOCONTENT,
            message:instrument
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error
        }else if(!instrument){
            response.status = NOTFOUND;
            response.message = {"message":"Instrument with Id: "+instrumentId+" not found"};
        }

        if(response.status===STATUSNOCONTENT){
            add_music(req,res,instrument);
        }else{
            res.status(response.status).json(response.message)
        }
    });
};

module.exports.updatePartialOneMusic = (req,res)=>{
    const instrumentId = req.params.instrumentId;
    Instrument.findById(instrumentId).select("musics").exec(function(error,instrument){
        const response = {status:STATUSNOCONTENT,message:instrument}
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!instrument){
            response.status = NOTFOUND;
            response.message = {"message":"Instrument with ID not found"}  
        }
        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);

        }else{
            update_music_patch(req,res,instrument);
        }
    })
}

module.exports.updateFUllOneMusic = (req,res)=>{
    const instrumentId = req.params.instrumentId;
    Instrument.findById(instrumentId).select("musics").exec(function(error,instrument){
        const response = {status:STATUSNOCONTENT,message:instrument}
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!instrument){
            response.status = NOTFOUND;
            response.message = {"message":"Instrument with ID not found"}  
        }
        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);

        }else{
            update_music_full(req,res,instrument);
        }
    })
}

module.exports.deleteMusic = (req,res)=>{
    const instrumentId = req.params.instrumentId;
    Instrument.findById(instrumentId).select("musics").exec(function(error,instrument){
        const response = {status:STATUSNOCONTENT,message:instrument}
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!instrument){
            response.status = NOTFOUND;
            response.message = {"message":"Instrument with ID not found"}  
        }
        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);

        }else{
            delete_music(req,res,instrument);
        }
    })
}



