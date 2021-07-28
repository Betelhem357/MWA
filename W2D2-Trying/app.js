angular.module("universityApp",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"homePage/homePage.html",
        controller:"homePageController",
        controllerAs: "homePageCtrl"
    }).when("/universities",{
        templateUrl: "university/university.html",
        controller: "universityController",
        controllerAs: "universityCtrl"
    })
    .otherwise({
        redirectTo: "/"
    });
}