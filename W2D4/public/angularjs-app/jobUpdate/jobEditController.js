angular.module("jobApp").controller("jobEditController",jobEditController);

function jobEditController(JobFactory,$routeParams,$location){
    vm = this;
    vm.job = {};
   const jobId = $routeParams.jobId;
   JobFactory.getJob(jobId).then(function(response){
       vm.job = response.data;
       vm.job.postDate = response.data.postDate ? new Date(response.data.postDate) : response.data.postDate;
   });
   vm.updatejob = function(){
       console.log("update",vm.job)
       JobFactory.updatejob(jobId,vm.job).then(function(){
           $location.path("/");
       });
   }
}