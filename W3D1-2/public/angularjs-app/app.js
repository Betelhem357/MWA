angular.module("instrumentsApp",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"/angularjs-app/homePage/homePage.html"
    })
    .when("/instruments",{
        templateUrl:"/angularjs-app/instrumentList/instruments.html",
        controller:"instrumentsController",
        controllerAs: "instrumentsCtrl"
    })
    .when("/instruments/:instrumentId",{
        templateUrl: "/angularjs-app/instrumentDetail/instrument.html",
        controller: "instrumentController",
        controllerAs: "instrumentCtrl"
    })
    .when("/instruments/update/:instrumentId",{
        templateUrl: "/angularjs-app/instrumentUpdate/instrumentUpdate.html",
        controller: "instrumentUpdateController",
        controllerAs: "instrumentUpdateCtrl"
    })
    .when('/register', {
        templateUrl: 'angularjs-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).
    when("/profile",{
        templateUrl:"/angularjs-app/profile/profile.html"
    })
    .otherwise({
        redirectTo: "/"
    });
}

function run($rootScope, $location, AuthFactory, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access && nextRoute.access.restricted && !AuthFactory.authenticated && !$window.sessionStorage.token) {
            event.preventDefault();
            $location.path('/');
        }
    });
}