angular.module("jobApp",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
    // .when("/", {
    //     templateUrl:"./angularjs-app/homePage/homePage.html"
    // })
    .when("/", {
        templateUrl:"./angularjs-app/jobList/jobList.html",
        controller:"jobListController",
        controllerAs:"jobCtrl"
    })
    .when("/jobs/:jobId", {
        templateUrl:"./angularjs-app/jobDetail/jobDetail.html",
        controller:"jobDetailController",
        controllerAs:"jobDetailCtrl"
    })
    .when("/job/Update/:jobId", {
        templateUrl:"./angularjs-app/jobUpdate/jobEdit.html",
        controller:"jobEditController",
        controllerAs:"jobUpdateCtrl"
    })
    .when("/job/add", {
        templateUrl:"./angularjs-app/addJob/addJob.html",
        controller:"addJobController",
        controllerAs:"jobAddCtrl"
    })
    .otherwise('/');
}