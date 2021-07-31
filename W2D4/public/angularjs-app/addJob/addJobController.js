angular.module("jobApp").controller("addJobController",addJobController);

function addJobController(JobFactory,$location){
    const vm = this;
    vm.job = {};

    vm.addjob = function(){
        console.log(vm.job);
        JobFactory.addNewJob(vm.job);
        $location.path("/");
    }
}