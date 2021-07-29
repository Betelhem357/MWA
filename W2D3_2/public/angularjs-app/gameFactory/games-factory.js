angular.module("meanGames").factory("GamesFactory",GamesFactory);

function GamesFactory($http){
    return{
         getAllGames: getAll,
         getOneGame: getOne,
         addOneGame:addOneGame,
         removeGame:removeGame,
         updateGame:updateGame
    }

    function getAll(){
        return $http.get("/api/games").then(complete).catch(failure);
    }

    function getOne(gameId){
        return $http.get("/api/games/"+gameId).then(complete).catch(failure);
    }

    function addOneGame(gameData){
        return $http.post("/api/games",gameData)
    }

    function removeGame(gameId){
        return $http.delete("/api/games/"+gameId)
    }

    function updateGame(gameId,gameData){
        return $http.patch("/api/games/"+gameId,gameData)
    }

    function complete(response){
        return response;
    }

    function failure(error){
        return error;
    }
}