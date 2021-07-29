angular.module("meanGames").controller("GamesController",GamesController);

function GamesController(GamesFactory){
    const vm = this;
    vm.title = "MEAN Games";
    GamesFactory.getAllGames().then(function(response){
        console.log("mean games",response);
        vm.games = response.data;
    });
    vm.newGameForm = {}
    vm.addGame = function(){
        console.log("Adding game",vm.gameForm.$valid);
        if(vm.gameForm.$valid){
            console.log("Game",vm.newGameForm);
            GamesFactory.addOneGame(vm.newGameForm);
        }
    }

    vm.removeGame = function(gameId){
        console.log("Remove Game",gameId);
        GamesFactory.removeGame(gameId);
    }
}