angular.module("universityApp").controller("universityController", universityController)

function universityController($http,universityFactory,$location) {
    const vm = this;
    let country = $location.search().country;
    if(!country){
        country = "Turkey";
    }
    vm.country = country;
    universityFactory.getUniversitiesByCountry(country).then(function (response) {
        vm.universities = response;
    });
}