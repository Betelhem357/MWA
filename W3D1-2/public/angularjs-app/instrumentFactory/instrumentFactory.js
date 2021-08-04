angular.module("instrumentsApp").factory("InstrumentFactory",InstrumentFactory);

function InstrumentFactory($http){
    return{
         getAllInstruments: getAll,
         getOneInstrument: getOne,
         addInstrument:addOneInstrument,
         removeInstrument:removeInstrument,
         updateInstrument:updateInstrument
    }

    function getAll(){
        return $http.get("/api/instruments").then(complete).catch(failure);
    }

    function getOne(instrumentId){
        return $http.get("/api/instruments/"+instrumentId).then(complete).catch(failure);
    }

    function addOneInstrument(instrument){
        return $http.post("/api/instruments",instrument);
    }

    function removeInstrument(instrumentId){
        return $http.delete("/api/instruments/"+instrumentId);
    }

    function updateInstrument(instrumentId,instrument){
        return $http.patch("/api/instruments/"+instrumentId,instrument);
    }

    function complete(response){
        return response;
    }

    function failure(error){
        return error;
    }
}