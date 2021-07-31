angular.module("jobApp").controller("jobListController",jobListController);

function jobListController(JobFactory,$location){
    const vm = this;
    vm.job = {};

    JobFactory.getAllJobs().then(function(response){
        vm.jobs = response.data;
        console.log(vm.jobs);
    });

    vm.addjob = function(){
        console.log(vm.job);
        JobFactory.addNewJob(vm.job);
    }
    vm.goToAddPage = function(){
        console.log("to add page")
        $location.path("/job/add");
    }
}