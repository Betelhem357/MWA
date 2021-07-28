angular.module("instrumentsApp",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"/angularjs-app/instrumentList/instruments.html",
        controller:"instrumentsController",
        controllerAs: "instrumentsCtrl"
    })
    .when("/instruments/:instrumentId",{
        templateUrl: "/angularjs-app/instrumentDetail/instrument.html",
        controller: "instrumentController",
        controllerAs: "instrumentCtrl"
    })
    .otherwise({
        redirectTo: "/"
    });
}