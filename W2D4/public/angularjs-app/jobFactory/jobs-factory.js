angular.module("jobApp").factory("JobFactory",jobsFactory);

function jobsFactory($http){
   return{
       getAllJobs:getAll,
       getJob:getOneJob,
       updatejob:editJob,
       removeJob:removeJob,
       addNewJob:addNewJob

   }

   function getAll(){
    return $http.get("/api/jobs").then(complete).catch(failure);
   }

   function getOneJob(jobId){
    return $http.get("/api/jobs/"+jobId).then(complete).catch(failure);
   }

   function editJob(jobId,updatedJob){
    return $http.put("/api/jobs/"+jobId,updatedJob).then(complete).catch(failure);
   }

   function removeJob(removeId){
    return $http.delete("/api/jobs/"+removeId).then(complete).catch(failure);
   }

   function addNewJob(newJob){
    return $http.post("/api/jobs",newJob).then(complete).catch(failure);
   }

   function complete(response){
       return response;
   }

   function failure(error){
       return error;
   }
}
