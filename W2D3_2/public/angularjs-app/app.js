angular.module("meanGames",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
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
    .otherwise({
        redirectTo: "/"
    });
}