angular.module("meanGames").controller("GameController",GameController);

function _getStarsArray(stars){
    return new Array(stars);
}

function GameController(GamesFactory,$routeParams){
    const vm = this;
    const gameId = $routeParams.gameId;
    console.log(gameId)
    GamesFactory.getOneGame(gameId).then(function(game){
        vm.game = game.data;
        // console.log(game)
        vm.rating = _getStarsArray(vm.game.rate)
    })
}