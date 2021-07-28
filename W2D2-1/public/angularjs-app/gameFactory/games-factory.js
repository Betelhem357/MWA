angular.module("meanGames").factory("GamesFactory",GamesFactory);

function GamesFactory($http){
    return{
         getAllGames: getAll,
         getOneGame: getOne
    }

    function getAll(){
        return $http.get("/api/games").then(complete).catch(failure);
    }

    function getOne(gameId){
        return $http.get("/api/games/"+gameId).then(complete).catch(failure);
    }

    function complete(response){
        return response;
    }

    function failure(error){
        return error;
    }
}