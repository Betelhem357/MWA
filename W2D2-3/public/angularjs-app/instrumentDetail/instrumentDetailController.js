angular.module("instrumentsApp").controller("instrumentController",InstrumentController);

function InstrumentController(InstrumentFactory,$routeParams){
    const vm = this;
    const instrumentId = $routeParams.instrumentId;
    console.log(instrumentId)
    InstrumentFactory.getOneInstrument(instrumentId).then(function(instrument){
        vm.instrument = instrument.data;
    })
}