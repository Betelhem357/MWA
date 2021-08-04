angular.module("instrumentsApp").controller("instrumentUpdateController",InstrumentUpdateController);

function InstrumentUpdateController(InstrumentFactory,$routeParams){
    const vm = this;
    const instrumentId = $routeParams.instrumentId;
    console.log(instrumentId)
    InstrumentFactory.getOneInstrument(instrumentId).then(function(instrument){
        vm.instrument = instrument.data;
    })
    vm.updateInstrument = function () {
        console.log("update Instrument")
        if (vm.instrumentForm.$valid) {
            console.log("Instrument Form is valid")
            console.log("updating",instrumentId,vm.instrument)
            InstrumentFactory.updateInstrument(instrumentId,vm.instrument);
        }
    }
}