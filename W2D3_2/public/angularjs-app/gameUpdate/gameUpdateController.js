angular.module("meanGames").controller("gameUpdateController",gameUpdateController);

function gameUpdateController(GamesFactory,$routeParams){
    const vm = this;
    const gameId = $routeParams.gameId;
    console.log(gameId)
    GamesFactory.getOneGame(gameId).then(function(game){
        vm.game = game.data;
    })
    vm.updateGame = function () {
        console.log("update Game")
        if (vm.gameForm.$valid) {
            console.log("Game Form is valid")
            console.log("updating",gameId,vm.game)
            GamesFactory.updateGame(gameId,vm.game);
        }
    }
}