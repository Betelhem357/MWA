angular.module("instrumentsApp").controller("instrumentsController",instrumentsController);

function instrumentsController(InstrumentFactory){
    const vm = this;
    vm.title = "Instruments Application";
    InstrumentFactory.getAllInstruments().then(function(response){
        console.log("Instrument",response.data)
        vm.instruments = response.data;
    });
}