angular.module('instrumentsApp').directive('instrumentsFooter', instrumentsFooter);

function instrumentsFooter() {
    return {
        restrict: 'E',
        templateUrl: 'angularjs-app/directives/footer/footer.html'
    }
}