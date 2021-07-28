angular.module("instrumentsApp").factory("InstrumentFactory",InstrumentFactory);

function InstrumentFactory($http){
    return{
         getAllInstruments: getAll,
         getOneInstrument: getOne
    }

    function getAll(){
        return $http.get("/api/instruments").then(complete).catch(failure);
    }

    function getOne(instrumentId){
        return $http.get("/api/instruments/"+instrumentId).then(complete).catch(failure);
    }

    function complete(response){
        return response;
    }

    function failure(error){
        return error;
    }
}