angular.module("meanGames",["ngRoute",'angular-jwt']).config(config).run(run);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"/angularjs-app/homePage/homePage.html"
    })
    .when("/games",{
        templateUrl:"/angularjs-app/game-list/games.html",
        controller:"GamesController",
        controllerAs: "gamesCtrl"
    })
    .when("/games/:gameId",{
        templateUrl: "angularjs-app/game-display/game.html",
        controller: "GameController",
        controllerAs: "gameCtrl"
    })
    .when("/games/update/:gameId",{
        templateUrl: "angularjs-app/gameUpdate/gameUpdate.html",
        controller: "gameUpdateController",
        controllerAs: "gameUpdateCtrl"
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