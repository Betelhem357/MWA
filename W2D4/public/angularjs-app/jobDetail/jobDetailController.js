angular.module("jobApp").controller("jobDetailController",jobDetailController);

function jobDetailController(JobFactory,$routeParams,$location){
   const vm = this;
   vm.job = {};
   const jobId = $routeParams.jobId;
   JobFactory.getJob(jobId).then(function(response){
       vm.job = response.data;
   });
   vm.goToUpdatePage = function(){
    console.log("to update page")
    $location.path("/job/Update/"+jobId);
   }
   vm.removeJob = function(){
    JobFactory.removeJob(jobId);
    $location.path("/");
   } 
}