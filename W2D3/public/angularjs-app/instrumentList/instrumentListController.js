angular.module("instrumentsApp").controller("instrumentsController", instrumentsController);

function instrumentsController(InstrumentFactory) {
    const vm = this;
    vm.title = "Instruments Application";
    InstrumentFactory.getAllInstruments().then(function (response) {
        console.log("Instrument", response.data)
        vm.instruments = response.data;
    });
    vm.formInstrument = {};
    vm.addInstrument = function () {
        console.log("add Instrument")
        if (vm.instrumentForm.$valid) {
            console.log("Instrument Form is valid")
            InstrumentFactory.addInstrument(vm.formInstrument);
        }
    }
    vm.removeInstrument = function(instrumentId){
        console.log("Remove instrument",instrumentId);
        InstrumentFactory.removeInstrument(instrumentId);
    }
}

