angular.module("meanGames").controller("GameController",GameController);

function GameController(GamesFactory,$routeParams){
    const vm = this;
    const gameId = $routeParams.gameId;
    console.log(gameId)
    GamesFactory.getOneGame(gameId).then(function(game){
        vm.game = game.data;
    })
}