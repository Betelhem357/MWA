angular.module('meanGames').directive('gamesFooter', gamesFooter);

function gamesFooter() {
    return {
        restrict: 'E',
        templateUrl: 'angularjs-app/directives/footer/footer.html'
    }
}