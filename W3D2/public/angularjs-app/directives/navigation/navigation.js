angular.module('meanGames').directive('gamesNavigation', gamesNavigation);

function gamesNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angularjs-app/directives/navigation/navigation.html'
    }
}